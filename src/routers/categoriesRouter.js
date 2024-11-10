const express = require("express");
class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    const router = express.Router();

    router.get("/", this.controller.getCategories.bind(this.controller));

    return router;
  }
}

module.exports = CategoriesRouter;
