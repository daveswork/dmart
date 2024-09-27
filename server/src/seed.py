from models import db, User, Item, Cart, Purchase
from app import app

from random import randint

from faker import Faker

def run():

    # Delete all data
    User.query.delete()
    Item.query.delete()
    Cart.query.delete()

    fake = Faker()

    users = []
    things = ['comb', 'beanie', 'hacky sack', 'soap', 'chair', 'pillow']
    items = []
    for i in range(4):
        u = User(
            username=fake.user_name(),
            firstname=fake.first_name_nonbinary(),
            lastname = fake.last_name_nonbinary()
        )
        users.append(u)


        item = Item(
            name = things[i],
            description = fake.sentence(),
            qty = randint(1, 30),
            price = randint(5, 50)
        )
        items.append(item)

    # commit changes
    db.session.add_all(users)
    db.session.add_all(items)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():  # running out script inside and app context
        run()


