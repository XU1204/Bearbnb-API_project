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
   await queryInterface.bulkInsert('ReviewImages',[
    {
      reviewId: 1,
      url:'https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'
    },
    {
      reviewId: 2,
      url:'https://www.pexels.com/photo/scenic-view-of-snow-capped-mountains-during-night-3408744/'
    },
    {
      reviewId: 3,
      url:'https://www.pexels.com/photo/aurora-borealis-624015/'
    },
    {
      reviewId: 4,
      url: 'https://www.pexels.com/photo/mountain-covered-snow-under-star-572897/'
    },
    {
      reviewId: 5,
      url: 'https://www.pexels.com/photo/beautiful-view-of-moraine-lake-2662116/'
    },
    {
      reviewId: 6,
      url:'https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'
    },
    {
      reviewId: 7,
      url:'https://www.pexels.com/photo/scenic-view-of-snow-capped-mountains-during-night-3408744/'
    },
    {
      reviewId: 8,
      url:'https://www.pexels.com/photo/aurora-borealis-624015/'
    },
    {
      reviewId: 9,
      url: 'https://www.pexels.com/photo/mountain-covered-snow-under-star-572897/'
    },
    {
      reviewId: 10,
      url: 'https://www.pexels.com/photo/beautiful-view-of-moraine-lake-2662116/'
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
    await queryInterface.bulkDelete('ReviewImages', {
      id: [1, 2, 3, 4, 5]
    })
  }
};
