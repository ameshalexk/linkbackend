const express = require('express');
const { getPlaces, addPlace, deletePlaces } = require('../controllers/places');

const router = express.Router();

router.route('/').get(getPlaces).post(addPlace).delete(deletePlaces);

module.exports = router;
