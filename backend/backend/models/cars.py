from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from backend.models import Base, association_table_book_car


if TYPE_CHECKING:
    from backend.models import User, Book


class Car(Base):
    __tablename__ = 'cars'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)
    number: Mapped[str] = mapped_column(nullable=False, unique=True)
    owner_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    owner: Mapped['User'] = relationship(
        back_populates='cars'
    )
    book_ids: Mapped[list['Book']] = relationship(
        secondary=association_table_book_car,
        back_populates='cars'
    )
