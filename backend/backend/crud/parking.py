from sqlalchemy.orm import Session
from backend import models, schemas, serializers


def get_parking_list(db: Session, payload: schemas.GetParkingList) -> list[models.Parking]:
    db_parking_list = db.query(models.Parking).all()

    return db_parking_list


def add_to_favorite(
        db: Session,
        user: models.User,
        parking_id: int) -> models.Parking:

    parking = db.query(models.Parking).filter(
        models.Parking.id == parking_id).first()

    user.favorite_parkings.append(parking)
    db.commit()
    db.refresh(user)
    return parking
