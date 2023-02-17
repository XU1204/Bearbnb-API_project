'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Wishlists', [
      {
        spotId: 2,
        userId: 1,
      },
      {
        spotId: 3,
        userId: 2,
      },
      {
        spotId: 4,
        userId: 3,
      },
      {
        spotId: 5,
        userId: 4,
      },
      {
        spotId: 1,
        userId: 5,
      },
      {
        spotId: 6,
        userId: 1,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Wishlists', {
      id: [1, 2, 3, 4, 5, 6]
    })
  }
};
