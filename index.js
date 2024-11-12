const express = require("express");
require("dotenv").config();
const db = require("./src/db/models");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

const { user, trip, category, destination } = db;

const ValidatorsRouter = require("./src/routers/validatorsRouter");
const UsersRouter = require("./src/routers/usersRouter");
const TripsRouter = require("./src/routers/tripsRouter");
const CategoriesRouter = require("./src/routers/categoriesRouter");
const DestinationsRouter = require("./src/routers/destinationsRouter");

const ValidatorsController = require("./src/controllers/validatorsController");
const UsersController = require("./src/controllers/usersController");
const TripsController = require("./src/controllers/tripsController");
const CategoriesController = require("./src/controllers/categoriesController");
const DestinationsController = require("./src/controllers/destinationsController");

const validatorsController = new ValidatorsController(user);
const usersController = new UsersController(user, trip, category);
const tripsController = new TripsController(trip, user, category, destination);
const categoriesController = new CategoriesController(category);
const destinationsController = new DestinationsController(destination, trip);

const validatorsRouter = new ValidatorsRouter(validatorsController).routes();
const usersRouter = new UsersRouter(usersController).routes();
const tripsRouter = new TripsRouter(tripsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();
const destinationsRouter = new DestinationsRouter(
  destinationsController
).routes();

app.use(cors());
app.use(express.json());

app.use("/", validatorsRouter);
app.use("/users", usersRouter);
app.use("/trips", tripsRouter);
app.use("/categories", categoriesRouter);
app.use("/destinations", destinationsRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
