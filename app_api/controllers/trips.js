const mongoose = require('mongoose'); //.set('debug', true);
const Model = mongoose.model('trips'); // Import the mongoose database library and our schema so it is available to use here

//Get: trips - lists all the trips
// callback method registered in the /api/trips route
const tripsList = async (req,res) => {
	Model
		.find({}) // empty filter for all - use the mongoose .find() method with no filter to return all instances
		.exec((err, trips) => {
			// if nothing is returned, send an HTTP 404 status
			if (!trips) {
				return res
					.status(404)
					.json({ "message": "trips not found" });
			} else if (err) {
				return res
					.status(404)
					.json(err);
			// if data was retrieved, send it to the client with HTTP 200 success status
			} else {
				return res
					.status(200)
					.json(trips);
			}
		});
};

// GET: /trips/:tripCode - returns a single trip
// callback method registered in the /api/trips/{tripCode} route
const tripsFindByCode = async (req,res) => {
	Model
		// use mongoose .find() method with filter set to the tripCode passed on the URL
		.find({ 'code': req.params.tripCode })
		.exec((err, trip) => {
			if (!trip) {
				return res
					.status(404)
					.json({ "message": "trip not found" });
			} else if (err) {
				return res
					.status(404)
					.json(err);
			} else {
				return res
					.status(200)
					.json(trip);
			}
		});
};

module.exports = {
	tripsList,
	tripsFindByCode
};