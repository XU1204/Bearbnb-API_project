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
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 1,
      startDate: '2020-10-01',
      endDate: '2020-10-04'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2020-12-21',
      endDate: '2020-12-24'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2021-04-01',
      endDate: '2021-04-04'
    },
    {
      spotId: 4,
      userId: 4,
      startDate: '2021-12-25',
      endDate: '2021-12-31'
    },
    {
      spotId: 5,
      userId: 5,
      startDate: '2022-06-11',
      endDate: '2022-06-14'
    },

   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', {
      id: [1, 2, 3, 4, 5]
    })
  }
};
