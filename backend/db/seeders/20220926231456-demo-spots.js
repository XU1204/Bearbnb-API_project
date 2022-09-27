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
   await queryInterface.bulkInsert('Spots', [
    {
      ownerId: 2,
      address: '2120 Speedway',
      city: 'Austin',
      state: 'Texas',
      lat: 100.1,
      lng: 200.2,
      name: 'Modern Farmhouse Near SOCO',
      description: 'Come work or explore Austin. It is close to S Congress, S Lamar, and 1.5 miles to Lady Bird Lake.',
      price: 151
    },
    {
      ownerId: 3,
      address: '2004 Clinton Pl',
      city: 'San Antonio',
      state: 'Texas',
      lat: 98.2,
      lng: 70.3,
      name: 'NO FEE Modern Downtown Home Pearl, Alamo, River',
      description: 'My mission is to ensure that you have all the amenities.',
      price: 218
    },
    {
      ownerId: 4,
      address: '5691 Redbug Rd',
      city: 'Snowflake',
      state: 'Arizona',
      lat: 80.1,
      lng: 60.4,
      name: 'Adorable above garage apartment at Sunrise Farm',
      description: 'Come experience our little farm that we are working on making into a permiculture oasis.',
      price: 100
    },
    {
      ownerId: 5,
      address: '2120 Herdrick Dr',
      city: 'Seattle',
      state: 'Washington',
      lat: 20.1,
      lng: 210.5,
      name: 'citizenM Seattle South Lake Union',
      description: 'itizenM Seattle South Lake has landed. Home of affordable luxury in the heart of South Lake Union.',
      price: 189
    },
    {
      ownerId: 1,
      address: '17921 Still Water Ln',
      city: 'Twentynine Palms',
      state: 'California',
      lat: 66.6,
      lng: 88.5,
      name: 'Architect\'s Off-Grid Stargazing Cabin.',
      description: 'Folly Joshua Tree is an off-grid outpost designed by Malek Alqadi.',
      price: 1125
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
    await queryInterface.bulkDelete('Spots',{
      name: [
        'Modern Farmhouse Near SOCO',
        'NO FEE Modern Downtown Home Pearl, Alamo, River',
        'Adorable above garage apartment at Sunrise Farm',
        'citizenM Seattle South Lake Union',
        'Architect\'s Off-Grid Stargazing Cabin.'
      ]
    })
  }
};
