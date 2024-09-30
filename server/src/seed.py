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
    things = [{'name':'comb', 'link':'https://i.imgur.com/jIN9hIA.jpg'}, 
              {'name':'beanie', 'link':'https://i.imgur.com/nGwLAH4.jpg'}, 
              {'name':'hacky sack', 'link':'https://i.imgur.com/w2z4bpq.jpg'}, 
              {'name':'soap', 'link':'https://i.imgur.com/EMbSFQZ.jpg'}, 
              {'name':'chair', 'link':'https://i.imgur.com/SrmeCdX.jpg'}, 
              {'name':'pillow', 'link':'https://i.imgur.com/LDXYi89.jpg'}, 
              {'name':'t-shirt', 'link':'https://i.imgur.com/P2PlMUU.jpg'}, 
              {'name':'pot', 'link':'https://i.imgur.com/sIudgDS.jpg'}]
    items = []
    for i in range(4):
        u = User(
            firstname=fake.first_name_nonbinary(),
            lastname = fake.last_name_nonbinary(),
            username=fake.user_name()
        )
        users.append(u)

    for i in range(len(things)):
        item = Item(
            name = things[i]['name'],
            description = fake.sentence(),
            qty = randint(1, 30),
            item_image = things[i]['link'],
            price = randint(5, 50)
        )
        print(item)
        items.append(item)

    # commit changes
    db.session.add_all(users)
    db.session.add_all(items)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():  # running out script inside and app context
        run()


