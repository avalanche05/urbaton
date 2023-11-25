from typing import Annotated, List, Tuple

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from requests import Session

from backend import schemas, crud, serializers, errors, models
from backend.dependencies import get_db, current_user

car_router = APIRouter(
    prefix="/book",
    tags=['Book']
)


@car_router.post(path="/create")
def create_cfa_image(book_create: schemas.BookCreateRequest = Body(...),
                     user: models.User = Depends(current_user),
                     db: Session = Depends(get_db)
                     ) -> schemas.Book:
    db_book = crud.create_book(db, book_create, user)

    return serializers.get_book(db_book)
