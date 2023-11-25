import random

from sqlalchemy.orm import Session
from fastapi import Depends

from backend.dependencies import get_db
from backend.models import Parking, Place


def fill_db(arr: list):
    db = next(get_db())
    for parking in arr:
        parkingDB = Parking(**parking)
        db.add(parkingDB)
    db.commit()


def fill_places():
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    numbers = "0123456789"
    db = next(get_db())
    parkings = db.query(Parking).all()

    places = []
    for parking in parkings:
        # number = random letter + random num
        for _ in range(parking.base_spaces):
            number = random.choice(letters) + random.choice(numbers)
            parking_type = "base"
            places.append(Place(
                number=number,
                type=parking_type,
                parking_id=parking.id
            ))

        for _ in range(parking.electro_spaces):
            number = random.choice(letters) + random.choice(numbers)
            parking_type = "electro"
            places.append(Place(
                number=number,
                type=parking_type,
                parking_id=parking.id
            ))

        for _ in range(parking.disabled_spaces):
            number = random.choice(letters) + random.choice(numbers)
            parking_type = "disabled"
            places.append(Place(
                number=number,
                type=parking_type,
                parking_id=parking.id
            ))
    db.add_all(places)
    db.commit()


fill_places()
