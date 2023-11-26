from fastapi import APIRouter, Depends, Body
from requests import Session

from backend import schemas, models, serializers, crud, utils
from backend.dependencies import current_user, get_db

review_router = APIRouter(
    prefix="/review",
    tags=['Review']
)


@review_router.post(path="/create")
def create_review(db: Session = Depends(get_db),
                  db_user: models.User = Depends(current_user),
                  create_review: schemas.ReviewCreateRequest = Body(...)) -> schemas.Review:
    """Создание отзыва"""

    db_review = crud.create_review(db, db_user, create_review)

    return serializers.get_review(db_review)


@review_router.get(path="/")
def get_reviews(parking_id: int,
                db: Session = Depends(get_db),
                skip: int = 0,
                limit: int = 100) -> list[schemas.Review]:
    """Получение отзывов"""

    db_reviews = crud.get_reviews(db, parking_id, skip, limit)

    return serializers.get_reviews(db_reviews)
