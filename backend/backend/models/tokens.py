from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.models import Base, User


class Token(Base):
    __tablename__ = 'tokens'

    value: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    is_alive: Mapped[bool] = mapped_column(Boolean, default=True)

    user: Mapped['User'] = relationship(back_populates='tokens')
