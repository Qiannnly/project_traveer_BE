const express = require("express");

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    const router = express.Router();
    router.get(
      "/:userId/limitedTrips",
      this.controller.getLimitedUserTrips.bind(this.controller)
    );

    router.get(
      "/:userId/trips",
      this.controller.getUserTrips.bind(this.controller)
    );
    router.get(
      "/:userId/trips/search",
      this.controller.getUserTripsByCategory.bind(this.controller)
    );

    router.put("/:userId", this.controller.updateUser.bind(this.controller));
    router.delete("/:userId", this.controller.deleteUser.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
