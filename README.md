# dmart
A simple shopping application. 

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