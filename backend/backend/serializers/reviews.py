from backend.models import reviews as db_model_review
from backend import schemas


def get_review(db_place: db_model_review.Review) -> schemas.Review:
    review = schemas.Review(
        id=db_place.id,
        text=db_place.text,
        rating=db_place.rating,
        tags=db_place.tags,
        user_id=db_place.user_id,
        parking_id=db_place.parking_id,
        username=db_place.username,
    )

    return review


def get_reviews(db_reviews: list[db_model_review.Review]) -> list[schemas.Review]:
    return [get_review(db_review) for db_review in db_reviews]
