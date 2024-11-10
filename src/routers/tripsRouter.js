const express = require("express");

class TripsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    const router = express.Router();

    router.get(
      "/:tripId/destinations",
      this.controller.getTripDestinations.bind(this.controller)
    );
    router.get("/:tripId", this.controller.getTrip.bind(this.controller));
    router.post("/", this.controller.createTrip.bind(this.controller));
    router.put("/:tripId", this.controller.updateTrip.bind(this.controller));
    router.delete("/:tripId", this.controller.deleteTrip.bind(this.controller));

    return router;
  }
}

module.exports = TripsRouter;
