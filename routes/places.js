const express = require('express');
const { getPlaces, addPlace, deletePlaces } = require('../controllers/places');
const {
  getPlaces1,
  addPlace1,
  deletePlaces1,
} = require('../controllers/places1');

const router = express.Router();
router.route('/').get(getPlaces).post(addPlace).delete(deletePlaces);
router.route('/1').get(getPlaces1).post(addPlace1).delete(deletePlaces1);

module.exports = router;
