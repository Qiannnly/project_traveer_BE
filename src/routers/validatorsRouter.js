const express = require("express");

class ValidatorsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    const router = express.Router();

    router.post(
      "/register",
      this.controller.registerUser.bind(this.controller)
    );
    router.post("/login", this.controller.loginUser.bind(this.controller));
    router.post("/user", this.controller.getUserDetails.bind(this.controller));

    return router;
  }
}

module.exports = ValidatorsRouter;
