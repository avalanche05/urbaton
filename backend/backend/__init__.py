from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.models import Base
from backend.core.database import engine
from backend import routes


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


def create_app() -> FastAPI:
    _app = FastAPI(lifespan=lifespan)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(routes.users.user_router)
    _app.include_router(routes.books.book_router)
    _app.include_router(routes.cars.car_router)
    _app.include_router(routes.parking.parking_router)

    return _app
