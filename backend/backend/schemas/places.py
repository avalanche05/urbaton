from typing import Literal
from pydantic import BaseModel


class Place(BaseModel):
    id: int
    number: str
    type: Literal['base', 'disabled', 'electro']

    parking_id: int
    is_busy: bool
