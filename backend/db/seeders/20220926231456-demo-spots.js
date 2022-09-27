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
      description: 'Come work or explore Austin. It is close to S Congress, S Lamar, and 1.5 miles to Lady Bird Lake. You’ll love this location b/c of the proximity to the Festivals Austin is known for. SXSW, ACL, Bat Watching, great dining and shopping. 7 miles to the airport. Walkability of the area makes daytime exploring easy, and evenings are surprisingly peaceful.',
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
      description: 'My mission is to ensure that you have all the amenities that you need to be comfortable, safe and enjoy your time in San Antonio. Entire Home walking distance to the Pearl, San Antonio Riverwalk, St Mary\'s Strip. Quiet Historic Tobin Hill neighborhood minutes from the all the downtown recreation, entertainment, attractions, and nightlife. 300Mbs Wifi, off street parking, laundry, allergen (HEPA/nut) free, pet friendly, no step access.',
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
      description: 'Come experience our little farm that we are working on making into a permiculture oasis. Come make memories at our unique and family-friendly place. There are chickens, goats and dogs on the property so be aware that you may hear and see the activity that is involved with farm life.',
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
      description: 'itizenM Seattle South Lake has landed. Home of affordable luxury in the heart of South Lake Union, our tech-savvy, design-loving hotel is just one block from Downtown Seattle and six minutes from the iconic Space Needle.',
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
      description: 'Folly Joshua Tree is an off-grid outpost designed by Malek Alqadi. Folly sleeps up to 6 people, but most comfortable for 4. The main cabin is modern and stylish that reflects the earthy tones of the landscape. The smaller structure houses an open-air bedroom that offers unique views of the mountains and is perfect for stargazing. It also has an indoor bedroom underneath.',
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
