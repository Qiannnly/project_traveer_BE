## TRAVEER - Travel Tracker app

TRAVEER is a full-stack travel app created with Expo to enable users to log and reference their past trips and destinations, add notes and photos. Users would be able to use the app like a travel diary by searching for places and adding a pin to them, and easily use it for future trip planning.

The backend of this app is built with Node.js, Express.js, Sequelize, and PostgreSQL.

## Steps

Install and run PostgreSQL server

Create database based on the following configurations:

- DB_USERNAME=travel_app
- DB_PASSWORD=null
- DB_NAME=travel_app
- DB_HOST = 127.0.0.1
- DB_DIALECT = postgres

### Install dependencies

npm install

### Run migrations

npx sequelize-cli db:migrate

### Usage

npm start
