from pydantic import BaseModel
from .users import User


class Token(BaseModel):
    bearer_token: str
    user: User
