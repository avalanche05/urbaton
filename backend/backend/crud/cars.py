from sqlalchemy.orm import Session
from backend import models, schemas


def create_car(db: Session, payload: schemas.CarCreateRequest, db_user: models.User) -> models.Car:
    """Создание Car пользователя"""

    db_car = models.Car(
        name=payload.name,
        type=payload.type,
        number=payload.number,
        owner_id=db_user.id,
    )

    db.add(db_car)
    db.commit()
    db.refresh(db_car)

    return db_car
