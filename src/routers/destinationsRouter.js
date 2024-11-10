const express = require("express");

const router = express.Router();

class DestinationsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    const router = express.Router();

    router.get(
      "/:destinationId",
      this.controller.getDestination.bind(this.controller)
    );
    router.post("/", this.controller.createDestination.bind(this.controller));
    router.put(
      "/:destinationId",
      this.controller.updateDestination.bind(this.controller)
    );
    router.delete(
      "/:destinationId",
      this.controller.deleteDestination.bind(this.controller)
    );

    return router;
  }
}

module.exports = DestinationsRouter;
