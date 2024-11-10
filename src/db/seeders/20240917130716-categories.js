"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Adventure",
        photo_url: "adventure.png",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Budget",
        photo_url: "budget.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Family",
        photo_url: "home.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Road Trip",
        photo_url: "caravan.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Relax",
        photo_url: "relax.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Couple",
        photo_url: "couple.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
