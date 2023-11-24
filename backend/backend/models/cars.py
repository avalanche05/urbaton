from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from backend.models import Base, User


class Car(Base):
    __tablename__ = 'cars'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)

    owner_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )
    owner: Mapped['User'] = relationship(
        back_populates='cars'
    )
