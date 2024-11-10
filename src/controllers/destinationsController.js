class DestinationsController {
  constructor(model, tripModel) {
    this.model = model;
    this.tripModel = tripModel;
  }

  async getDestination(req, res) {
    const { destinationId } = req.params;

    try {
      const destination = await this.model.findByPk(destinationId);
      return res.json(destination);
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async createDestination(req, res) {
    const { tripId, name, description, lat, lng, photoUrl } = req.body;

    try {
      await this.model.create({
        name,
        description,
        lat,
        lng,
        photoUrl,
        tripId,
      });
      return res.status(200).send({
        status: "Ok",
        message: "Destination created successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateDestination(req, res) {
    const { destinationId } = req.params;
    const { name, description, lat, lng, photoUrl } = req.body;

    try {
      await this.model.update(
        {
          name,
          description,
          lat,
          lng,
          photoUrl,
        },
        {
          where: {
            id: destinationId,
          },
        }
      );
      return res.status(200).send({
        status: "Ok",
        message: "Destination updated successfully",
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async deleteDestination(req, res) {
    const { destinationId } = req.params;

    try {
      const selectedDestination = await this.model.findByPk(destinationId);
      await selectedDestination.destroy();
      return res.status(200).send({
        status: "Ok",
        message: "Destination deleted",
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }
}
module.exports = DestinationsController;
