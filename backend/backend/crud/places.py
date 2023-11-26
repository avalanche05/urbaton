from datetime import datetime

from sqlalchemy.orm import Session
from backend import models, errors, utils


def places_by_parking_id(db: Session, parking_id: int, time_start: datetime, time_end: datetime):
    """Получение мест по id парковки"""
    # фильтруем места по id парковки
    db_places = db.query(models.Place).filter(models.Place.parking_id == parking_id).all()
    # получаем id занятых мест
    busy_place_ids = set()
    db_books = db.query(models.Book).filter(models.Book.time_start <= time_end,
                                            models.Book.time_end >= time_start,
                                            models.Book.parking_id == parking_id).all()
    for book in db_books:
        busy_place_ids.add(book.place_id)

    return db_places, busy_place_ids
