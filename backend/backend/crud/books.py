from datetime import datetime, timezone

from sqlalchemy.orm import Session

from backend import models, schemas, crud
from backend.errors import PlaceUnavailable


def create_book(db: Session, payload: schemas.BookCreateRequest, db_user: models.User) -> models.Book:
    """Создание Book пользователя"""
    try:
        db_parking = db.query(models.Parking).filter(models.Parking.id == payload.parking_id).first()
    except AttributeError:
        raise Exception('Parking not found')

    calculated_price = db_parking.price * (payload.time_end - payload.time_start).total_seconds() // 3600


    if db_user.balance < calculated_price:
        raise Exception('Not enough money')
    count_base = 0
    count_disabled = 0
    count_electro = 0

    for car_id in payload.car_ids:
        car = db.query(models.Car).filter(models.Car.id == car_id).first()
        if car is None:
            raise Exception('Car not found')
        if car.type == 'base':
            count_base += 1
        elif car.type == 'disabled':
            count_disabled += 1
        elif car.type == 'electro':
            count_electro += 1

    booked_electro_spaces = 0
    booked_base_spaces = 0
    booked_disabled_spaces = 0
    if count_electro and db_parking.electro_spaces - db_parking.busy_electro_spaces < 1:
        raise Exception('Not enough electro places')
    elif count_electro:
        booked_electro_spaces = 1
    elif count_disabled and db_parking.disabled_spaces - db_parking.busy_disabled_spaces < 1:
        raise Exception('Not enough disabled places')
    elif count_disabled:
        booked_disabled_spaces = 1
    elif db_parking.base_spaces - db_parking.busy_base_spaces < 1:
        raise Exception('Not enough base places')
    else:
        booked_base_spaces = 1

    db_user.balance -= calculated_price
    db.add(db_user)

    db_parking.busy_electro_spaces += booked_electro_spaces
    db_parking.busy_base_spaces += booked_base_spaces
    db_parking.busy_disabled_spaces += booked_disabled_spaces
    db.add(db_parking)

    if payload.place_id is None:
        number = book_uncertain_place(db, payload.parking_id, payload.time_start, payload.time_end)
        if number is not None:
            db_book = models.Book(
                user_id=db_user.id,
                parking_id=payload.parking_id,
                time_start=payload.time_start.replace(tzinfo=timezone.utc),
                time_end=payload.time_start.replace(tzinfo=timezone.utc),
                place_id=number
            )
        else:
            raise PlaceUnavailable('Place reserved')
    else:
        db_book = models.Book(
            user_id=db_user.id,
            parking_id=payload.parking_id,
            time_start=payload.time_start.replace(tzinfo=timezone.utc),
            time_end=payload.time_start.replace(tzinfo=timezone.utc),
            place_id=payload.place_id
        )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def book_uncertain_place(db: Session, parking_id: int, time_start: datetime, time_end: datetime) -> int | None:
    places = crud.places.places_by_parking(db, parking_id)
    for place in places:
        found = True
        for book in place.books:
            if time_start.replace(tzinfo=timezone.utc) >= book.time_end.replace(tzinfo=timezone.utc) or time_end.replace(tzinfo=timezone.utc) <= book.time_start.replace(tzinfo=timezone.utc):
                found = False
                break
        if found:
            print(place.id)
            return place.id

    return None
