from backend.models import users as db_model_user
from backend import schemas
from .cars import get_cars
from .books import get_books


def get_user(db_user: db_model_user.User) -> schemas.User:
    user = schemas.User(
        id=db_user.id,
        phone=db_user.phone,
        balance=db_user.balance,
        cars=get_cars(db_user.cars),
        books=get_books(db_user.books),
        favorites=[]
    )

    return user
