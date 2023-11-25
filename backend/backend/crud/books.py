from sqlalchemy.orm import Session
from backend import models, schemas


def create_book(db: Session, payload: schemas.BookCreateRequest, db_user: models.User) -> models.Book:
    """Создание Car пользователя"""

    db_book = models.Book(
        user_id=db_user.id,
        parking_id=payload.id,
        time_start=payload.time_start,
        time_end=payload.time_start
    )

    db.add(db_book)
    db.commit()
    db.refresh(db_book)

    return db_book
