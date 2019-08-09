/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
import trips from '../models/trips';
class Trips {
  /* Checking if the Trip exixts */
  static checkTrip(tripId) {
    let checkTrip = {};
    for (const key in trips) {
      if (trips[key].id === tripId) {
        checkTrip = trips[key];
        break;
      }
    }
    return checkTrip;
  }
  /* create */
  static create(req, res) {
    const newTrip = {
      id: Math.ceil(Math.random() * 100),
      createdOn: Date.now(),
      seatingCapacity: req.body.seatingCapacity,
      busLicenseNumber: req.body.busLicenseNumber,
      origin: req.body.origin,
      destination: req.body.destination,
      tripDate: Date.parse(new Date(req.body.tripDate)),
      fare: req.body.fare,
      status: req.body.status,
    };
    trips.push(newTrip);
    const isCreated = Trips.checkTrip(newTrip.id);
    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        message: 'trip created successfully',
        data: isCreated,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Trip not created!',
    });
  }
  /* get all trips */
  static getAllTrips(req, res) {
    if (Object.keys(trips).length > 0) {
      return res.status(200).json({
        status: 200,
        message: 'available trips',
        data: trips,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Trip not found!',
    });
  }
  /* get Trip by id */
  static getTrip(req, res) {
    let oneTrip = {};
    for (const key in trips) {
      if (trips[key].id === parseInt(req.params.tripId)) {
        oneTrip = trips[key];
        break;
      }
    }
    if (Object.keys(oneTrip).length > 0) {
      return res.status(200).json({
        status: 200,
        data: oneTrip,
        message: 'trips found',
      });
    }
    return res.status(400).json({
      status: 404,
      error: 'Trip not found!',
    });
  }
  /* delete a trip */
  static deleteTrip(req, res) {
    const tripNumber = trips.length;
    let NewTripNumber = trips.length;
    for (const i in trips) {
      if (trips[i].id === parseInt(req.params.tripId)) {
        trips.splice(i, 1);
        NewTripNumber -= 1;
        break;
      }
    }
    if (NewTripNumber < tripNumber) {
      return res.status(200).json({
        status: 200,
        data: 'Trip deleted',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Trip not deleted!',
    });
  }
  static cancelTrip(req, res) {
    const {
      tripId,
    } = req.params;
    let find;
    trips.find((data) => {
      if (data.id === parseInt(tripId, 10)) {
        data.status = 2;
        return res.status(200).json(data);
      }
      return res.status(404).json({
        status:404,
        error: 'not found',
      });
    });
}
}
export default Trips;