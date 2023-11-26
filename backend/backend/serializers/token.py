from backend.models import tokens as db_model_token
from backend import schemas

from .users import get_user


def get_token(db_token: db_model_token.Token) -> schemas.Token:
    token = schemas.Token(
        bearer_token=db_token.value,
        user=get_user(db_token.user),
    )

    return token
