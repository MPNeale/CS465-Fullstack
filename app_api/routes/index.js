const express = require('express');
const router = express.Router();

const tripController = require('../controllers/trips');

router
	.route('/trips')
	.get(tripController.tripsList);

router
	.route('/trips/:tripCode')
	.get(tripController.tripsFindByCode);

module.exports = router;