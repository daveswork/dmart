from models import db, User, Item, Cart
from app import app

from random import randint

from faker import Faker

def run():

    # Delete all data
    User.query.delete()
    Item.query.delete()
    Cart.query.delete()

    fake = Faker()

    # commit changes
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():  # running out script inside and app context
        run()


