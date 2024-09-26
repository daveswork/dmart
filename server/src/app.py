import os
import traceback
from flask import Flask, request, session
from flask_migrate import Migrate
from models import db, User, Item, Cart
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
