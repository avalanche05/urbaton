from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, ARRAY

from backend.models import Base


class Review(Base):
    __tablename__ = 'reviews'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    text: Mapped[str] = mapped_column(nullable=True)
    rating: Mapped[int] = mapped_column(nullable=True)
    tags: Mapped[List[str]] = mapped_column(nullable=True, type_=ARRAY(String))
    username: Mapped[str] = mapped_column(nullable=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    parking_id: Mapped[int] = mapped_column(
        ForeignKey('parking.id'),
        nullable=False
    )

    user: Mapped['User'] = relationship(
        back_populates='reviews'
    )
    parking: Mapped['Parking'] = relationship(
        back_populates='reviews'
    )
