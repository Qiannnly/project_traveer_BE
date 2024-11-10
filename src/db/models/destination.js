"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class destination extends Model {
    static associate(models) {
      this.belongsTo(models.trip, {
        foreignKey: "trip_id",
      });
    }
  }
  destination.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      photoUrl: DataTypes.STRING,
      tripId: {
        type: DataTypes.INTEGER,
        references: {
          model: "trip",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "destination",
      underscored: true,
    }
  );
  return destination;
};
