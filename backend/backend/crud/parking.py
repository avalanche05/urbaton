from sqlalchemy.orm import Session
from backend import models, schemas, serializers


def get_parking_list(db: Session, payload: schemas.GetParkingList) -> list[models.Parking]:
    db_parking_list = db.query(models.Parking).all()

    return db_parking_list
