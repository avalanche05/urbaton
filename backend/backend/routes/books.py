from typing import Annotated, List, Tuple

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from backend import schemas, crud, serializers, errors, models
from backend.dependencies import get_db, current_user

book_router = APIRouter(
    prefix="/book",
    tags=['Book']
)


@book_router.post(path="/create")
def create_book(book_create: schemas.BookCreateRequest = Body(...),
                     user: models.User = Depends(current_user),
                     db: Session = Depends(get_db)
                     ) -> schemas.Book:
    db_book = crud.create_book(db, book_create, user)

    return serializers.get_book(db_book)
