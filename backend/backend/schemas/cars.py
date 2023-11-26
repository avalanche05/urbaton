from pydantic import BaseModel


class Car(BaseModel):
    id: int
    name: str
    type: str
    number: str
    owner_id: int


class CarCreateRequest(BaseModel):
    name: str
    type: str
    number: str
