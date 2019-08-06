import trips from '../models/trips';

class Trips {
  /* Checking if the Trip exixts */
  static checkTrip(tripId) {
    let checkTrip = {};
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    for (const key in trips) {
      checkTrip = trips[key];
      if (trips[key].id === tripId) {
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
}
export default Trips;
