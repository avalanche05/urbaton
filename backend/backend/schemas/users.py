from pydantic import BaseModel
from typing_extensions import Annotated
from pydantic.functional_validators import AfterValidator
from .validators import positive_number
from .cars import Car
from .books import Book
from .parking import Parking


class User(BaseModel):
    id: int
    phone: str
    balance: float
    cars: list[Car]
    books: list[Book]
    favorites: list[Parking]


class UserCreateRequest(BaseModel):
    phone: str
    password: str


class UserLoginRequest(BaseModel):
    phone: str
    password: str


class UserDepositRequest(BaseModel):
    value: Annotated[float, AfterValidator(positive_number)]
