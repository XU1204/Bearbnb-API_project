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
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-706381619820981565/original/f62cd94b-ead7-4d65-940d-6141562c57c3.jpeg?im_w=1440',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-716674445310682476/original/3dbb1597-6ac6-4877-bb08-7188742b8203.jpeg?im_w=1200',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-722408789066131629/original/83cd6729-13ed-43a6-86fb-166eba8a03ac.jpeg?im_w=1200',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-734596846818164578/original/4cebb10d-c7f2-4add-9c74-58d74f683431.jpeg?im_w=1200',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-709425013149528376/original/c3841205-def4-40a6-a6c1-9b0cfab58688.jpeg?im_w=1200',
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
