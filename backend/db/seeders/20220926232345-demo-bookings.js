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
      startDate: '2020-10-01 14:00',
      endDate: '2020-10-04 12:00'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2020-12-21 14:00',
      endDate: '2020-12-24 12:00'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2021-04-01 14:00',
      endDate: '2021-04-04 12:00'
    },
    {
      spotId: 4,
      userId: 4,
      startDate: '2021-12-25 14:00',
      endDate: '2021-12-31 12:00'
    },
    {
      spotId: 5,
      userId: 5,
      startDate: '2022-06-11 14:00',
      endDate: '2022-06-14 12:00'
    },
    {
      spotId: 6,
      userId: 1,
      startDate: '2020-05-01 14:00',
      endDate: '2020-05-04 12:00'
    },
    {
      spotId: 7,
      userId: 2,
      startDate: '2020-03-21 14:00',
      endDate: '2020-03-24 12:00'
    },
    {
      spotId: 8,
      userId: 3,
      startDate: '2021-07-01 14:00',
      endDate: '2021-07-04 12:00'
    },
    {
      spotId: 9,
      userId: 4,
      startDate: '2021-09-25 14:00',
      endDate: '2021-09-30 12:00'
    },
    {
      spotId: 10,
      userId: 5,
      startDate: '2022-11-11 14:00',
      endDate: '2022-11-14 12:00'
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
    await queryInterface.bulkDelete('Bookings', {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    })
  }
};
