from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

from backend.models import Base

if TYPE_CHECKING:
    from backend.models import Car


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    balance: Mapped[float] = mapped_column(default=0)

    cars: Mapped[list['Car']] = relationship(
        cascade='all,delete-orphan',
        back_populates='owner'
    )

    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)
