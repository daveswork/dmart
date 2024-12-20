# dmart
A simple shopping application. 

Demo: https://youtu.be/jaIMGyU75XI

## Home view:
Displays a catalogue of products currently in inventory. 
Allows you add an item to the shopping cart. 
Displays the quantity of items in the shopping cart. 
## Cart view:
The shopping cart view allows you to remove an item. 
## Purchase view:
Work in progress.
## Profile view:
Work in progress.
## Add Item view:
Allows you to add a new item to the inventory.



# Installation:

## Backend

### ENV vars
STRIPE_SECRET # Stripe API Secret Key

APP_SECRET_KEY # A unique secret key for use in JWT authentication

Credentials for Postgres connection:

PG_USER = os.environ.get('PG_USER')

PG_PASS = os.environ.get('PG_PASS')

PG_URL = os.environ.get('PG_URL')

Ensure the `dmartdb` is created prior to running the migration scripts.

To create the secret key use the following:
```
export APP_SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(16))')
```

 Use the above to store a unique key for JWT encryption.


### Startup
Run the following:

```
pipenv install
pipenv shell
cd server/src/
export FLASK_APP=app.py
flask db upgrade
python seed.py
python app.py
```

## Front end
Requires the following:

```
$ npm --version
10.8.2

$ node --version
v20.17.0

```


Run the following:

```
cd client
npm install
npm run dev
```
