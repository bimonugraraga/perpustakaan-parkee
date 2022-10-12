'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let books = [
      {
        "title": "Neuromancer",
        "isbn": "a123",
        "stocks": 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "title": "Burning Chrome",
        "isbn": "b123",
        "stocks": 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "title": "Monalisa OverDrive",
        "isbn": "c123",
        "stocks": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Books', books, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {})
  }
};
