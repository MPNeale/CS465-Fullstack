const express = require('express');
const router = express.Router();

const tripController = require('../controllers/trips');

router
	.route('/trips')
	.get(tripController.tripsList)
	.post(tripController.tripsAddTrip);

router
	.route('/trips/:tripCode')
	.get(tripController.tripsFindByCode)
	.put(tripController.tripsUpdateTrip);

module.exports = router;