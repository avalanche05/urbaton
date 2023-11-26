from backend.models import books as db_model_book
from backend import schemas, serializers


def get_book(db_book: db_model_book.Book) -> schemas.Book:
    book = schemas.Book(
        id=db_book.id,
        user_id=db_book.user_id,
        parking_id=db_book.parking_id,
        place_id=db_book.place_id,
        time_start=db_book.time_start,
        time_end=db_book.time_end,
        cars=serializers.get_cars(db_book.cars)
    )

    return book


def get_books(db_books: list[db_model_book]) -> list[schemas.Book]:
    return [get_book(db_book) for db_book in db_books]
