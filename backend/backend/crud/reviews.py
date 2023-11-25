from datetime import datetime

from sqlalchemy.orm import Session
from backend import models, errors, utils, schemas


def create_review(db: Session, db_user: models.User, create_review: schemas.ReviewCreateRequest):
    """Создание отзыва"""

    username = utils.get_random_alias()

    db_parking = db.query(models.Parking).filter(models.Parking.id == create_review.parking_id).first()
    if not db_parking:
        raise errors.ParkingNotFound()

    db_parking.review_count += 1
    db_parking.rating = (db_parking.rating * (
                db_parking.review_count - 1) + create_review.rating) / db_parking.review_count
    db.add(db_parking)
    db_review = models.Review(
        text=create_review.text,
        rating=create_review.rating,
        tags=create_review.tags,
        user_id=db_user.id,
        parking_id=create_review.parking_id,
        username=username,
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


def get_reviews(db: Session, parking_id: int, skip: int = 0, limit: int = 100) -> list[models.Review]:
    """Получение всех отзывов parking"""

    return db.query(models.Review).filter(models.Review.parking_id == parking_id).offset(skip).limit(limit).all()
