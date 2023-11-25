from typing import Dict, List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ARRAY, String, Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB

from backend.models import Base, association_is_favorite


class Parking(Base):
    __tablename__ = 'parking'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    address: Mapped[str] = mapped_column(nullable=False)
    center: Mapped[Dict] = mapped_column(nullable=False, type_=JSONB)
    polygon: Mapped[List[Dict]] = mapped_column(
        nullable=False,
        type_=ARRAY(JSONB)
    )
    contacts: Mapped[str] = mapped_column(nullable=False)

    base_spaces: Mapped[int] = mapped_column(nullable=False, default=0)
    busy_base_spaces: Mapped[int] = mapped_column(nullable=False, default=0)
    disabled_spaces: Mapped[int] = mapped_column(nullable=False, default=0)
    busy_disabled_spaces: Mapped[int] = mapped_column(
        nullable=False,
        default=0
    )
    electro_spaces: Mapped[int] = mapped_column(nullable=False, default=0)
    busy_electro_spaces: Mapped[int] = mapped_column(nullable=False, default=0)

    schedule: Mapped[str] = mapped_column(nullable=False)
    number: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[float] = mapped_column(nullable=False, default=0)
    is_camera: Mapped[bool] = mapped_column(nullable=False, default=False)
    is_protected: Mapped[bool] = mapped_column(nullable=False, default=False)
    tags: Mapped[List[str]] = mapped_column(
        nullable=False,
        type_=ARRAY(String)
    )
    rating: Mapped[float] = mapped_column(nullable=False, default=0)
    review_count: Mapped[int] = mapped_column(nullable=False, default=0)

    books: Mapped[list['Book']] = relationship(back_populates='parking')
    is_favorite: Mapped[list['User']] = relationship(
        secondary=association_is_favorite,
        back_populates='favorite_parkings'
    )
    places: Mapped[list['Place']] = relationship(
        back_populates='parking',
        cascade='all,delete-orphan',
    )

    reviews: Mapped[list['Review']] = relationship(
        back_populates='parking'
    )
