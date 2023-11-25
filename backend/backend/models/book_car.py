from sqlalchemy import Table, Column, ForeignKey

from backend.models import Base


association_table_book_car = Table(
    "association_table_book_car",
    Base.metadata,
    Column("book_id", ForeignKey("books.id"), primary_key=True),
    Column("car_id", ForeignKey("cars.id"), primary_key=True),
)
