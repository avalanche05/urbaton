from pydantic import BaseModel


class PolygonPoint(BaseModel):
    longitude: float
    latitude: float


class Parking(BaseModel):
    id: int
    address: str
    center: PolygonPoint
    polygon: list[PolygonPoint]
    contacts: str
    base_spaces: int
    busy_base_spaces: int
    disabled_spaces: int
    busy_disabled_spaces: int
    electro_spaces: int
    busy_electro_spaces: int
    schedule: str
    number: str
    price: int
    is_camera: bool
    is_protected: bool
    tags: list[str]
    rating: int
    is_favorite: bool
