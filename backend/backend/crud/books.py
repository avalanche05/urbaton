from sqlalchemy.orm import Session
from backend import models, schemas


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

    cars = []
    for car_id in payload.car_ids:
        car = db.query(models.Car).filter(models.Car.id == car_id).first()
        if car is None:
            raise Exception('Car not found')

        cars.append(car)
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

    db_book = models.Book(
        user_id=db_user.id,
        parking_id=payload.parking_id,
        time_start=payload.time_start,
        time_end=payload.time_start,
        place_id=payload.place_id,
        cars=cars,
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)

    return db_book
