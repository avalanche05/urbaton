from backend.models import cars as db_model_car
from backend import schemas


def get_car(db_car: db_model_car.Car) -> schemas.Car:
    car = schemas.Car(
        id=db_car.id,
        name=db_car.name,
        type=db_car.type,
        number=db_car.number,
        owner_id=db_car.owner_id,
    )

    return car
