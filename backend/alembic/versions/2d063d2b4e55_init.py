"""init

Revision ID: 2d063d2b4e55
Revises: 
Create Date: 2022-07-18 18:31:28.447757

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d063d2b4e55'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'car_brand',
        sa.Column('id', sa.Integer, autoincrement=True, primary_key=True),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('logo', sa.String, nullable=False),
        sa.Column('description', sa.String, nullable=False),
        sa.Column('status', sa.Boolean, nullable=False),
        sa.Column('create_at', sa.DateTime, nullable=False),
        sa.Column('update_at', sa.DateTime, nullable=False),
    )

    op.create_table(
        'car_model',
        sa.Column('id', sa.Integer, autoincrement=True, primary_key=True),
        sa.Column('car_brand_id', sa.Integer, nullable=False),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('status', sa.Boolean, nullable=False),
        sa.Column('create_at', sa.DateTime, nullable=False),
        sa.Column('update_at', sa.DateTime, nullable=False),
        sa.ForeignKeyConstraint(('car_brand_id',),['car_brand.id',])
    )


def downgrade() -> None:
    op.drop_table('car_model')
    op.drop_table('car_brand')
