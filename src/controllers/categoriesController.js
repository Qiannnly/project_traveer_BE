class CategoriesController {
  constructor(model) {
    this.model = model;
  }

  async getCategories(req, res) {
    try {
      const categories = await this.model.findAll();
      return res.json(categories);
    } catch (err) {
      return res
        .status(400)
        .send({ status: "Error", message: "An error has occurred" });
    }
  }
}
module.exports = CategoriesController;
