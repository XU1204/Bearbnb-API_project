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
      address: '100 W N Loop Blvd',
      city: 'Austin',
      state: 'Texas',
      lat: 30.317930,
      lng: -97.722210,
      name: 'The Southern Studio',
      description: 'Kick back and relax in this calm,  stylish studio fit for 1-3 people.  Kitchen is equipped with cooking tools.',
      price: 151
    },
    {
      ownerId: 3,
      address: '10141 Wurzbach Rd',
      city: 'San Antonio',
      state: 'Texas',
      lat: 29.534370,
      lng: -98.559820,
      name: 'NO FEE Modern Downtown Home Pearl, Alamo, River',
      description: 'My mission is to ensure that you have all the amenities.',
      price: 218
    },
    {
      ownerId: 4,
      address: '650 N Clark Rd',
      city: 'Show Low',
      state: 'Arizona',
      lat: 34.254779533909,
      lng: -110.08603804452373,
      name: 'Adorable above garage apartment at Sunrise Farm',
      description: 'Come experience our little farm that we are working on making into a permiculture oasis.',
      price: 100
    },
    {
      ownerId: 5,
      address: '3418 S Star Lake Rd',
      city: 'Auburn',
      state: 'Washington',
      lat: 47.353500,
      lng: -122.289050,
      name: 'Raindrop Getaway',
      description: 'We\'re proud to offer you Raindrop Getaway, a private guest suite. We offer the luxurious feel of an upscale hotel and the comfort and friendliness of a private retreat.',
      price: 189
    },
    {
      ownerId: 1,
      address: '17921 Still Water Ln',
      city: 'Twentynine Palms',
      state: 'California',
      lat: 34.2337826465383,
      lng: -116.06165110674766,
      name: 'Secluded Tiny Home Near JTNP',
      description: 'Welcome to Cactus Mountain Hideaway! Enjoy stargazing, sunsets and sunrises from our tiny home overlooking unobstructed views of the desert mountain landscape.',
      price: 1125
    },
    {
      ownerId: 2,
      address: '141 Wildwood Trl',
      city: 'Broken Bow',
      state: 'Oklahoma',
      lat: 34.164816220853744,
      lng: -94.76183355479552,
      name: 'Secluded Couples Cabin -with Hot Tub and Fire Pit!',
      description: 'Set on a spacious acre lot surrounded by towering pine trees , the cabin features a  warm and inviting living area.',
      price: 209
    },
    {
      ownerId: 3,
      address: '3400 Whitney Ave',
      city: 'Hamden',
      state: 'Connecticut',
      lat: 41.42165744228608,
      lng: -72.90406902929882,
      name: 'Short stay gem near Quinnipiac University',
      description: 'Relax with the whole family at this peaceful place to stay near Quinnipiac University and Sleeping Giant State Park.'
    },
    {
      ownerId: 4,
      address: '2521 W Fort Toulouse Rd',
      city: 'Wetumpka',
      state: 'Alabama',
      lat: 32.50887282156723,
      lng: -86.25090982024301,
      name: 'The Dirt Rd River Cabin',
      description: 'The Dirt Road River Cabin is a wonderful secluded cabin on the Coosa River,  great for couple/friends getaways. ',
      price: 169
    },
    {
      ownerId: 5,
      address: '91 Southpointe Dr',
      city: 'Fort Poerce',
      state: 'Florida',
      lat: 27.443333751545143,
      lng: -80.2837992619007,
      name: 'The Perfect Spot, Private Beach, Beautiful Sunsets',
      description: 'Just a 3 minute walk to our private Beach for a plunge into the surf.  Forever summer with sunset views from the balcony.',
      price: 299
    },
    {
      ownerId: 1,
      address: '1154 Glendale Blvd, Los Angeles',
      city: 'Los Angeles',
      state: 'California',
      lat: 34.077771949517334,
      lng: -118.26051528662774,
      name: 'Tranquil and Private Cottage in Silverlake',
      description: 'A dreamy little guest house nestled on private street in Silverlake that feels totally unique to LA. ',
      price: 147
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
    await queryInterface.bulkDelete('Spots',{
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    })
  }
};
