from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


# naming convention for db constraints (fixes an alembic bug)
convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}


# init sqlalchemy object
db = SQLAlchemy(metadata=MetaData(naming_convention=convention))


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Iteger, primary_key=True)
    username = db.Column(db.String)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)

    # Relationships
    cart = db.relationship('Cart', back_populates='users')

    # Serialize rules
    serialize_rules = ['-cart.users']

    # Validations

    # Repr
    def __repr__(self) -> str:
        return f'<User {self.username}, {self.firstname}, {self.lastname}>'



class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    qty = db.Column(db.Integer)
    item_image = db.Column(db.String)
    price = db.Column(db.Float)

    cart = db.relationship('Cart', back_populates='items')

    # Serialize rules
    serialize_rules = ['-cart.items']

    # Validations

    # Repr
    def __repr__(self) -> str:
        return f'<Item {self.name}, {self.description}, {self.qty}, {self.item_image}, {self.price}>'


class Cart(db.Model, SerializerMixin):
    __tablename__ = 'cart'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    # Relationships
    users = db.relationship('User', back_populates='cart')
    items = db.relationship('Item', back_populates='cart')

    # Serialize rules
    serialize_rules = ['-users.cart', '-items.cart']

    # Validations

    # Repr
    def __repr__(self) -> str:
        return f'<Cart {self.id}, {self.user_id}, {self.item_id}, {self.qty}>'