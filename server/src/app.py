import os
import traceback
import stripe
from flask import Flask, request, session
from flask_migrate import Migrate
from models import db, User, Item, Cart, Purchase
from flask_cors import CORS


# FLASK app config
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

# Stripe config
stripe.api_key = os.environ.get('STRIPE_SECRET')

# Item route and functions
#
@app.route('/items', methods=['GET', 'POST'])
def get_all_items():
    if request.method == 'GET':
        all_items = [item.to_dict() for item in Item.query.all()]
        return all_items, 200
    if request.method == 'POST':
        data = request.get_json()
        item = Item(
            name=data.get('name'), 
            description=data.get('description'), 
            qty=int(data.get('qty')),
            item_image=data.get('item_image'), 
            price=float(data.get('price'))
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict(),200

@app.route('/items/<int:id>', methods=['GET','PATCH', 'DELETE'])
def items_by_id(id):
    item = Item.query.filter_by(id=id).first()
    if item is None:
        return {"error":"Item not found"}, 404
    if request.method == 'GET':
        return item.to_dict(),200
    if request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(item, attr, data[attr])
        db.session.add(item)
        db.session.commit()
        return item.to_dict(),200 
    if request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return {},200
    

# Cart routes and functions
#
@app.route('/cart', methods=['GET', 'POST'])
def get_all_cart_items():
    if request.method == 'GET':
        all_items = [item.to_dict() for item in Cart.query.all()]
        return all_items,200
    if request.method == 'POST':
        data = request.get_json()
        item = Cart(
            qty = data.get('qty', 0), 
            sale_price = data.get('sale_price'), 
            user_id = data.get('user_id'),
            item_id = data.get('item_id')
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 200

@app.route('/cart/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def cart_update(id):
    item = Cart.query.filter_by(id=id).first()
    if item is None:
        return {'error':'Item not found'}, 404
    if request.method == 'GET':
        return item.to_dict(), 200
    if request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(item, attr, data[attr])
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 200
    if request.method == 'DELETE':
        inventory = Item.query.filter_by(id=item.item_id).first()
        inventory.qty += item.qty
        db.session.add(inventory)
        db.session.commit()
        db.session.delete(item)
        db.session.commit()
        return {}, 200

@app.route('/add-to-cart/<int:id>', methods=['GET'])
def add_to_cart(id):
    '''
    Takes an item id. 
    Returns a cart_item.
    Looks up the item from the items table using the id.
    Checks if the item is in the cart table. 
    If it is, then increment the quantity.
    If it isn't, then add the item to the cart table with an initial quantity of 1.
    '''
    item = Item.query.filter_by(id=id).first()
    cart_item = Cart.query.filter_by(item_id=id).first()
    print(cart_item)
    if cart_item is None:
        cart_item = Cart(
            qty =1,
            sale_price = item.price,
            item_id = item.id
        )
        db.session.add(cart_item)
        db.session.commit()
        item.qty -= 1
        db.session.add(item)
        db.session.commit()

        return cart_item.to_dict(), 200
    else:
        cart_item.qty +=1
        db.session.add(cart_item)
        db.session.commit()
        item.qty -= 1
        db.session.add(item)
        db.session.commit()
        return cart_item.to_dict(),200

    

# Purchases route and functions
#
@app.route('/purchases', methods=['GET', 'POST'])
def get_all_purchases():
    if request.method == 'GET':
        all_items = [item.to_dict() for item in Purchase.query.all()]
        return all_items, 200
    if request.method == 'POST':
        data = request.get_json()
        item = Purchase(
            date = data.get('date'),
            qty = data.get('qty', 0),
            sale_price = data.get('sale_price', 0),
            user_id = data.get('user_id'), 
            item_id = data.get('item_id')
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 200

@app.route('/purchases/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def purchases_update(id):
    item = Purchase.query.filter_by(id=id).first()
    if item is None:
        return {'error':'Item not found'}
    if request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(item, attr, data.get(attr))
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 200
    if request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return {}, 200


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
