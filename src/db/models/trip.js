"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.destination);
      this.belongsToMany(models.category, {
        through: "trip_categories",
      });
    }
  }
  trip.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      photoUrl: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "trip",
      underscored: true,
    }
  );
  return trip;
};
