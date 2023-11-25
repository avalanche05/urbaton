"""empty message

Revision ID: 774b8bc05733
Revises: a96e5b99ff2d
Create Date: 2023-11-25 01:33:27.055337

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '774b8bc05733'
down_revision: Union[str, None] = 'a96e5b99ff2d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cars', sa.Column('number', sa.String(), nullable=False))
    op.create_unique_constraint(None, 'cars', ['number'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'cars', type_='unique')
    op.drop_column('cars', 'number')
    # ### end Alembic commands ###