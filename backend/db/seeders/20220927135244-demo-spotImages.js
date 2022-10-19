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
      url: 'https://image.shutterstock.com/image-photo/custom-built-nicely-landscaped-luxury-600w-100512892.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://image.shutterstock.com/image-photo/luxury-house-spring-vancouver-canada-600w-1352690099.jpg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://image.shutterstock.com/image-photo/big-luxury-house-dusk-night-600w-108205049.jpg',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://image.shutterstock.com/image-photo/custom-built-luxury-house-nicely-600w-229302916.jpg',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://image.shutterstock.com/image-photo/cute-autumn-hygge-home-decor-600w-1812210559.jpg',
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
