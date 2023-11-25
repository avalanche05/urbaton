import itertools
from typing import List

from fastapi import APIRouter, Body, Depends, HTTPException, Response
from requests import Session

from backend import schemas, crud, serializers, errors, models
from backend.dependencies import get_db, current_user

user_router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@user_router.post(path="/register")
def register_user(user: schemas.UserCreateRequest = Body(...),
                  db: Session = Depends(get_db)
                  ) -> schemas.Token:
    try:
        db_user = crud.create_user(db, user)
    except errors.PhoneAlreadyAssociatedError as e:
        raise HTTPException(status_code=409, detail=str(e))
    db_token = crud.create_token(db, db_user.id)

    return serializers.get_token(db_token)


@user_router.post(path="/login")
def login_user(user: schemas.UserLoginRequest = Body(...),
               db: Session = Depends(get_db)
               ) -> schemas.Token:
    try:
        db_user = crud.read_user_by_phone(db, user)
    except errors.AuthenticationError as e:
        raise HTTPException(status_code=401, detail=str(e))
    db_token = crud.create_token(db, db_user.id)

    return serializers.get_token(db_token)


@user_router.get(path="/profile")
def profile_user(user: models.User = Depends(current_user),
                 db: Session = Depends(get_db)
                 ) -> schemas.User:
    return serializers.get_user(user)


@user_router.post(path="/deposit")
def deposit_user(user: models.User = Depends(current_user),
                 deposit: schemas.UserDepositRequest = Body(...),
                 db: Session = Depends(get_db)
                 ) -> Response:
    try:
        crud.update_user_balance(db, user.id, deposit.value)
    except errors.UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return Response(status_code=200)
