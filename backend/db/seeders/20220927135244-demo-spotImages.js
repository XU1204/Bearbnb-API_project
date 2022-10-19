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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: 'https://www.territorysupply.com/wp-content/uploads/2020/11/countryside-vacation-airbnb-oklahoma.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://www.territorysupply.com/wp-content/uploads/2020/11/belle-ame-cabin-oklahoma.jpg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://www.territorysupply.com/wp-content/uploads/2020/11/poolside-airbnb-oklahoma.jpg',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://www.territorysupply.com/wp-content/uploads/2020/11/circle-pines-cabin-rental-oklahoma.jpg',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://www.territorysupply.com/wp-content/uploads/2020/11/cottage-airbnb-oklahoma.jpg',
      preview: true,
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
    await queryInterface.bulkDelete('SpotImages', {
      id: [1, 2, 3, 4, 5]
    })
  }
};
