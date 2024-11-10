"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      this.belongsToMany(models.trip, {
        through: "trip_categories",
      });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      underscored: true,
    }
  );
  return category;
};
