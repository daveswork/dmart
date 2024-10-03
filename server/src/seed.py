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
    things = [{'name':'comb', 'link':'/comb.jpg', 'description':'A basic comb'}, 
              {'name':'beanie', 'link':'/beanie.jpg', 'description':'A basic beanie'}, 
              {'name':'hacky sack', 'link':'/hacky-sack.jpg', 'description':'A basic hacky sack'}, 
              {'name':'soap', 'link':'/soap.jpg', 'description':'A basic soap'}, 
              {'name':'chair', 'link':'/chair.jpg', 'description':'A basic chair'}, 
              {'name':'pillow', 'link':'/pillow.jpg', 'description':'A basic pillow'}, 
              {'name':'t-shirt', 'link':'/t-shirt.jpeg', 'description':'A basic t-shirt'}, 
              {'name':'pot', 'link':'/pot.jpg', 'description':'A basic pot'}]
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
            description = things[i]['description'],
            qty = randint(1, 30),
            item_image = things[i]['link'],
            price = randint(5, 20)
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


