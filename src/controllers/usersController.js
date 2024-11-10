const { where } = require("sequelize");
const trip = require("../db/models/trip");
const user = require("../db/models/user");
const bcrypt = require("bcrypt");

class UsersController {
  constructor(model, tripModel, categoryModel) {
    this.model = model;
    this.tripModel = tripModel;
    this.categoryModel = categoryModel;
  }

  async findUserByEmail(email) {
    const user = await this.model.findOne({
      where: { email: email },
    });
    return user;
  }

  async getLimitedUserTrips(req, res) {
    const { userId } = req.params;

    try {
      const userTrips = await this.tripModel.findAll({
        where: {
          userId: userId,
        },
        limit: 3,
      });
      return res.status(200).send({
        status: "Ok",
        data: userTrips,
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async getUserTrips(req, res) {
    const { userId } = req.params;

    try {
      const userTrips = await this.tripModel.findAll({
        where: {
          userId: userId,
        },
      });
      return res.status(200).send({
        status: "Ok",
        data: userTrips,
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async getUserTripsByCategory(req, res) {
    const { userId } = req.params;
    const searchedTerm = req.query.q;

    try {
      const searchedCategory = await this.categoryModel.findOne({
        where: {
          name: searchedTerm,
        },
      });
      const searchedCategoryId = searchedCategory.id;

      const searchedTrips = await this.tripModel.findAll({
        include: [
          {
            model: this.categoryModel,
            through: {
              where: {
                category_id: searchedCategoryId,
              },
            },
            required: true,
          },
        ],
        where: {
          userId: userId,
        },
      });

      return res.json(searchedTrips);
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async updateUser(req, res) {
    const { userId } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
      // const encryptedPassword = bcrypt.hashSync(hashedPassword, 10);

      await this.model.update(
        {
          firstName,
          lastName,
          email,
          // hashedPassword: encryptedPassword,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      const updatedUser = await this.model.findByPk(userId);
      return res.status(200).send({
        status: "Ok",
        message: "User updated successfully!",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      const selectedUser = await this.model.findByPk(userId);
      await selectedUser.destroy();
      return res.status(200).send({
        status: "Ok",
        message: "User deleted",
      });
    } catch (err) {
      return res.status(400).send({ message: "An error has occurred" });
    }
  }
}

module.exports = UsersController;
