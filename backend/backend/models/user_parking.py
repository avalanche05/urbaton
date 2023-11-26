from sqlalchemy import Table, Column, ForeignKey

from backend.models import Base


association_is_favorite = Table(
    "association_table_is_favorite",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("parking_id", ForeignKey("parking.id"), primary_key=True),
)
