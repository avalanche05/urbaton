from pydantic import BaseModel


class Review(BaseModel):
    id: int
    text: str
    rating: int
    tags: list[str]
    user_id: int
    parking_id: int
    username: str


class ReviewCreateRequest(BaseModel):
    text: str
    rating: int
    tags: list[str]
    parking_id: int
