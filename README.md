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