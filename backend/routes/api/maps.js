const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');
const { geoAPIKey } = require('../../config');

router.post('/key', (req, res) => {

  // console.log('-----api maps---/key---res', res)
  res.json({ googleMapsAPIKey });
});

router.post('/geokey', (req, res) => {

  // console.log('-----api maps---/geokey---res', res)
  res.json({ geoAPIKey });
});

module.exports = router;
