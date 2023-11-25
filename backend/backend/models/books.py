from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from backend.models import Base, association_table_book_car


class Book(Base):
    __tablename__ = 'books'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )
    parking_id: Mapped[int] = mapped_column(
        ForeignKey('parking.id'),
        nullable=False
    )
    time_start: Mapped[datetime] = mapped_column(
        nullable=False,
        default=datetime.utcnow
    )
    time_end: Mapped[datetime] = mapped_column(
        nullable=False,
        default=datetime.utcnow
    )

    parking: Mapped['Parking'] = relationship(back_populates='books')
    user: Mapped['User'] = relationship(back_populates='books')
    cars: Mapped[list['Car']] = relationship(
        secondary=association_table_book_car, back_populates='book_ids'
    )
