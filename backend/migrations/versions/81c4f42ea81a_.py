"""empty message

Revision ID: 81c4f42ea81a
Revises: 75cad73b6ef6
Create Date: 2023-11-25 02:23:27.862789

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '81c4f42ea81a'
down_revision: Union[str, None] = '75cad73b6ef6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parking',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('center', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
    sa.Column('polygon', sa.ARRAY(postgresql.JSONB(astext_type=sa.Text())), nullable=False),
    sa.Column('contacts', sa.String(), nullable=False),
    sa.Column('base_spaces', sa.Integer(), nullable=False),
    sa.Column('busy_base_spaces', sa.Integer(), nullable=False),
    sa.Column('disabled_spaces', sa.Integer(), nullable=False),
    sa.Column('busy_disabled_spaces', sa.Integer(), nullable=False),
    sa.Column('electro_spaces', sa.Integer(), nullable=False),
    sa.Column('busy_electro_spaces', sa.Integer(), nullable=False),
    sa.Column('schedule', sa.String(), nullable=False),
    sa.Column('number', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('is_camera', sa.Boolean(), nullable=False),
    sa.Column('is_protected', sa.Boolean(), nullable=False),
    sa.Column('tags', sa.ARRAY(sa.String()), nullable=False),
    sa.Column('rating', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('phone', sa.String(), nullable=False))
    op.drop_constraint('users_phone_number_key', 'users', type_='unique')
    op.create_unique_constraint(None, 'users', ['phone'])
    op.drop_column('users', 'phone_number')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('phone_number', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'users', type_='unique')
    op.create_unique_constraint('users_phone_number_key', 'users', ['phone_number'])
    op.drop_column('users', 'phone')
    op.drop_table('parking')
    # ### end Alembic commands ###