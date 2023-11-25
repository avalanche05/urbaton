from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from backend.models import Base


class Place(Base):
    __tablename__ = 'places'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    number: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=True)

    parking_id: Mapped[int] = mapped_column(
        ForeignKey('parking.id'),
        nullable=False
    )

    book_id: Mapped[int] = mapped_column(
        ForeignKey('books.id'),
        nullable=True
    )

    parking: Mapped['Parking'] = relationship(
        back_populates='places'
    )
    book: Mapped['Book'] = relationship(
        back_populates='place',
    )
