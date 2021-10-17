const mongoose = require('mongoose'); //.set('debug', true);
const Trip = mongoose.model('trips'); // Import the mongoose database library and our schema so it is available to use here
const User = mongoose.model('users');

//Get: trips - lists all the trips
// callback method registered in the /api/trips route
const tripsList = async (req,res) => {
	Trip
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
	Trip
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

const tripsAddTrip = async (req, res) => {
	console.log(req.body);
	getUser(req, res,
		(req, res) => {
	Trip
		.create({
			code: req.body.code,
			name: req.body.name,
			length: req.body.length,
			start: req.body.start,
			resort: req.body.resort,
			perPerson: req.body.perPerson,
			image: req.body.image,
			description: req.body.description
		},
		(err, trip) => {
			if (err) {
				return res
					.status(400) // bad request invalid content
					.json(err);
			} else {
				return res
					.status(201) // created
					.json(trip);
			}
		
		});
	});
}

const tripsUpdateTrip = async (req, res) => {
	console.log(req.body);
	getUser(req, res,
		(req, res) => {
	Trip
		.findOneAndUpdate({ 'code': req.params.tripCode }, {
			code: req.body.code,
			name: req.body.name,
			length: req.body.length,
			start: req.body.start,
			resort: req.body.resort,
			perPerson: req.body.perPerson,
			image: req.body.image,
			description: req.body.description
		}, { new: true })
		.then(trip => {
			if(!trip) {
				return res
					.status(404)
					.send({
						message: "Trip not found with code " + req.params.tripCode
					});
			}
			return res
				.status(500) //server error
				.json(err);
		});
	});
}

const getUser = (req, res, callback) => {
	if (req.payload && req.payload.email) {
		User
			.findOne({ email : req.payload.email })
			.exec((err, user) => {
				if (!user) {
					return res
						.status(404)
						.json({"message": "User not found"});
				} else if (err) {
					console.log(err);
					return res
						.status(404)
						.json(err);
				}
				callback(req, res, user.name);
			});
	} else {
		return res
			.status(404)
			.json({"message": "User not found"});
	}
};

module.exports = {
	tripsList,
	tripsFindByCode,
	tripsAddTrip,
	tripsUpdateTrip
};