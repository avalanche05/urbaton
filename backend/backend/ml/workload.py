import logging
import pickle
from dataclasses import dataclass
from pathlib import Path
import catboost as cb
import pandas as pd
from sklearn.linear_model import LinearRegression
import datetime as dt
from pydantic import BaseModel, Field

from backend.schemas import WorkLoad, DayLoad, LoadHour

_ZONES = [201, 205, 210, 206, 209, 202, 203, 208, 207, 211, 213, 204, 212]
_DOW_MAP = {
    0: 'Понедельник',
    1: 'Вторник',
    2: 'Среда',
    3: 'Четверг',
    4: 'Пятница',
    5: 'Суббота',
    6: 'Воскресенье',
}


@dataclass
class ModelsForZone:
    linear: LinearRegression
    boosting: cb.CatBoostRegressor


def _gen_linear_features(zone_df):
    fts_df = pd.DataFrame(index=zone_df.index)
    for shift in [1, 24, 24 * 7]:
        for roll in [1, 2, 3, 6, 12, 24, 24 * 7]:
            fts_df[f'shift_{shift}_prev_{roll}_hour_avg_load'] = zone_df['load'].shift(shift).rolling(roll).mean()
            if roll != 1:
                fts_df[f'shift_{shift}_prev_{roll}_hour_max_load'] = zone_df['load'].shift(shift).rolling(roll).max()
                fts_df[f'shift_{shift}_prev_{roll}_hour_min_load'] = zone_df['load'].shift(shift).rolling(roll).min()
                fts_df[f'shift_{shift}_prev_{roll}_hour_median_load'] = zone_df['load'].shift(shift).rolling(
                    roll).median()
    return fts_df


def _gen_categorical_features(zone_df):
    fts_df = pd.DataFrame(index=zone_df.index)
    fts_df[['hour', 'month']] = zone_df[['hour', 'month']]
    fts_df['weekday'] = zone_df.apply(lambda x: dt.datetime(x['year'], x['month'], x['day']).weekday(), axis=1)
    return fts_df


class WorkloadInference:
    def __init__(self, model_dir: Path, statistics_file: Path):
        self._model_dir = model_dir
        self._statistics_file = statistics_file
        self._models = {}
        self._statistics = {}
        self._logger = logging.getLogger()

    def load(self):
        for zone in _ZONES:
            linear_path = self._model_dir / f'zone_{zone}_lr.bin'
            boosting_path = self._model_dir / f'zone_{zone}_cb.bin'
            with linear_path.open('rb') as f:
                linear = pickle.load(f)  # i hate sklearn for not being able to save not in picklefile
            boosting = cb.CatBoostRegressor()
            boosting.load_model(str(boosting_path))
            self._models[zone] = ModelsForZone(
                linear=linear,
                boosting=boosting
            )
        statistics = pd.read_csv(self._statistics_file).set_index('index')
        for zone in _ZONES:
            self._statistics[zone] = {}
            stat_zone = statistics[statistics['zone'] == zone]
            for itm in stat_zone.itertuples():
                self._statistics[zone][dt.datetime(itm.year, itm.month, itm.day, itm.hour)] = itm.load

    def predict_item(self, zone: int, at: dt.datetime):
        if at in self._statistics[zone]:
            return
        self._logger.info(f'Predicting info for zone={zone}, ts={at}')
        prev_at = at - dt.timedelta(hours=1)
        if prev_at not in self._statistics[zone]:
            raise ValueError('No previous sample :(')
        relevant = [
            {'year': n_at.year, 'month': n_at.month, 'day': n_at.day, 'hour': n_at.hour, 'load': n_load}
            for n_at, n_load in self._statistics[zone].items()
            if ((at - n_at).total_seconds() / 60 / 60) <= 24 * 7 + 24 * 7 and (at - n_at).total_seconds() > 0
        ]
        relevant.append({'year': at.year, 'month': at.month, 'day': at.month, 'hour': at.hour, 'load': 0})
        relevant = pd.DataFrame(relevant).sort_values(['year', 'month', 'day', 'hour'])
        linear_fts = _gen_linear_features(relevant).iloc[[-1]]
        cat_fts = _gen_categorical_features(relevant).iloc[[-1]]
        pred_linear = self._models[zone].linear.predict(linear_fts).item()
        cb_df = pd.concat([linear_fts, cat_fts], axis='columns')
        cb_df['linreg'] = pred_linear
        pred_cb = self._models[zone].boosting.predict(cb_df).item()
        result = max(0, round(pred_cb))
        self._statistics[zone][at] = result

    def predict_up_to_item(self, zone: int, at: dt.datetime):
        max_stat = max(self._statistics[zone].keys())
        for pred_item in pd.date_range(max_stat + dt.timedelta(hours=1), at, freq='1H'):
            self.predict_item(zone, pred_item)

    def get_stats_at_week(self, zone: int, dt_inside_week: dt.date) -> WorkLoad:
        dt_inside_week = dt.datetime.combine(dt_inside_week, dt.time(hour=0, minute=0, second=0))
        week_starts = (dt_inside_week - dt.timedelta(days=dt_inside_week.weekday()))
        week_ends = (week_starts + dt.timedelta(days=6)).replace(hour=23)
        self.predict_up_to_item(zone, week_ends)
        return WorkLoad(workLoad=[
            DayLoad(
                day=_DOW_MAP[dow],
                loadHours=[
                    LoadHour(
                        hour=str(hour).zfill(2),
                        load=str(self._statistics[zone][week_starts + dt.timedelta(hours=hour, days=dow)])
                    )
                    for hour in range(24)
                ]
            )
            for dow in range(7)
        ])

