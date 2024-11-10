const { Op } = require("sequelize");

class TripsController {
  constructor(model, userModel, categoryModel, destinationModel) {
    this.model = model;
    this.userModel = userModel;
    this.categoryModel = categoryModel;
    this.destinationModel = destinationModel;
  }

  async getTripDestinations(req, res) {
    const { tripId } = req.params;

    try {
      const tripDestinations = await this.destinationModel.findAll({
        where: {
          tripId: tripId,
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["tripId", "createdAt", "updatedAt", "trip_id"],
        },
      });

      return res.status(200).send({
        status: "Ok",
        data: tripDestinations,
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }
  async getTrip(req, res) {
    const { tripId } = req.params;

    try {
      const trip = await this.model.findByPk(tripId);
      return res.json(trip);
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async createTrip(req, res) {
    const {
      userId,
      name,
      description,
      startDate,
      endDate,
      photoUrl,
      categories,
    } = req.body;

    try {
      const trip = await this.model.create({
        name,
        description,
        startDate,
        endDate,
        photoUrl,
        userId,
      });

      const selectedCategories = await this.categoryModel.findAll({
        where: {
          name: categories,
        },
      });

      trip.addCategories(selectedCategories);

      const createdTrip = trip;
      console.log(trip);

      return res.status(200).send({
        status: "Ok",
        message: "Trip created successfully",
        data: trip,
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async updateTrip(req, res) {
    const { tripId } = req.params;
    const { name, description, startDate, endDate, photoUrl } = req.body;

    try {
      await this.model.update(
        {
          name,
          description,
          startDate,
          endDate,
          photoUrl,
        },
        {
          where: {
            id: tripId,
          },
        }
      );
      return res.status(200).send({
        status: "Ok",
        message: "Trip updated successfully",
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async deleteTrip(req, res) {
    const { tripId } = req.params;

    try {
      const selectedTrip = await this.model.findByPk(tripId);
      await selectedTrip.destroy();
      return res.status(200).send({
        status: "Ok",
        message: "Trip deleted",
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }
}
module.exports = TripsController;
