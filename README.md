# dmart
A simple shopping application. 


# Installation:

## Backend
Run the following:

```
pipenv install
pipenv shell
cd server/src/
export FLASK_APP=app.py
flask db init
flask db migrate -m "initial migration"
flask db upgrade
python seed.py
python app.py
```

## Front end

Run the following:

```
cd client
npm install
npm run dev
```