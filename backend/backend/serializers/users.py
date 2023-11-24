from backend.models import users as db_model_user
from backend import schemas


def get_user(db_user: db_model_user.User) -> schemas.User:
    user = schemas.User(
        id=db_user.id,
        phone=db_user.phone,
        balance=db_user.balance,
    )

    return user
