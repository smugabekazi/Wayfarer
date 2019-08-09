/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import bookings from '../models/bookings';
class Bookings {
  /* Checking if the Trip exixts */
  static checkBooking(bookingId) {
    let checkBooking = {};
    for (const key in bookings) {
      if (bookings[key].id === bookingId) {
        checkBooking = bookings[key];
        break;
      }
    }
    return checkBooking;
  }
  /* create */
  static create(req, res) {
    const newBooking = {
      id: Math.ceil(Math.random() * 100),
      createdOn: Date.now(),
      tripDate: Date.parse(new Date(req.body.tripDate)),
      busLicenseNumber: req.body.busLicenseNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userEmail: req.body.userEmail,
    };
    bookings.push(newBooking);
    const isCreated = Bookings.checkBooking(newBooking.bookingId);
    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        message: 'Your trip has successfully booked',
        data: isCreated,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Oops this booking not done!',
    });
  }
  /* get all bookings */
  static getAllBookings(req, res) {
    if (Object.keys(bookings).length > 0) {
      return res.status(200).json({
        status: 200,
        message: 'available trips',
        data: bookings,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Trip not found!',
      
    });
    console.log(req);
  }
  /* delete a booking */
  static deleteBooking(req, res) {
    const bookingNumber = bookings.length;
    let NewBookingNumber = bookings.length;
    for (const i in bookings) {
      // eslint-disable-next-line radix
      if (bookings[i].id === parseInt(req.params.bookingId)) {
        bookings.splice(i, 1);
        NewBookingNumber -= 1;
        break;
      }
    }
    if (NewBookingNumber < bookingNumber) {
      return res.status(200).json({
        status: 200,
        data: 'Booking deleted',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Booking not deleted!',
    });
  }
}
export default Bookings;