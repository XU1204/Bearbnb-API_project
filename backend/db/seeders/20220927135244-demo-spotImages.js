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
      url: 'https://www.pexels.com/photo/scenic-photo-of-forest-with-sunlight-1757363/',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://www.pexels.com/photo/green-pine-trees-covered-with-fogs-under-white-sky-during-daytime-167699/',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://www.pexels.com/photo/brown-mountains-2559941/',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://www.pexels.com/photo/snowy-forest-235621/',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://www.pexels.com/photo/gray-asphalt-road-in-dark-forest-7753054/',
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
