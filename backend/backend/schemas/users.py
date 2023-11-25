from pydantic import BaseModel
from typing_extensions import Annotated
from pydantic.functional_validators import AfterValidator
from .validators import positive_number


class User(BaseModel):
    id: int
    phone: str
    balance: float


class UserCreateRequest(BaseModel):
    phone: str
    password: str


class UserLoginRequest(BaseModel):
    phone: str
    password: str


class UserDepositRequest(BaseModel):
    value: Annotated[float, AfterValidator(positive_number)]
