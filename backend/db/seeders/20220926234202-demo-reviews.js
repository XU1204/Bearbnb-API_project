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
   await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1,
      userId: 1,
      review: 'Peaceful, comfortable and well laid out. Beds are memory foam on the firmer side. We prefer softer, but we all slept well.',
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: 'Perfect house for our needs - great location, spacious yard and patio, well-appointed kitchen and living room - and great comms from the host.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'Pretty good stay. We weren\'t a fan of the lawn and the water pressure but over all we felt safe and had a good time! Appreciated the supplied glassware and cookware.',
      stars: 5
    },
    {
      spotId: 4,
      userId: 4,
      review: 'Really cute place! Beautiful hardwood and great features!',
      stars: 4
    },
    {
      spotId: 5,
      userId: 5,
      review: 'Great place! Very clean, great location, good communication!',
      stars: 4
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
    await queryInterface.bulkDelete('Reviews', {
      id: [1, 2, 3, 4, 5]
    })
  }
};
