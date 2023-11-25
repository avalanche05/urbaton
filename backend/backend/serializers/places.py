from backend.models import places as db_model_place
from backend import schemas


def get_place(db_place: db_model_place.Place, busy_places: set[int]) -> schemas.Place:
    place = schemas.Place(
        id=db_place.id,
        number=db_place.number,
        type=db_place.type,
        parking_id=db_place.parking_id,
        is_busy=db_place.id in busy_places,
    )

    return place


def get_places(db_places: list[db_model_place.Place], busy_places: set[int]) -> list[schemas.Place]:
    return [get_place(db_place, busy_places) for db_place in db_places]
