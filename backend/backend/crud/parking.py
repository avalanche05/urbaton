from typing import Optional

from sqlalchemy.orm import Session
from backend import models, schemas, serializers


def get_parking_list(db: Session, user_id: Optional[int] = None):
    try:
        db_user = db.query(models.User).filter(models.User.id == user_id).first()
        favorite_parking_ids = [parking.id for parking in db_user.favorite_parkings]
    except AttributeError:
        favorite_parking_ids = []
    db_parking_list = db.query(models.Parking).all()

    return db_parking_list, favorite_parking_ids


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
