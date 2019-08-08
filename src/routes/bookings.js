import express from 'express';
import Bookings from '../controllers/bookings';
​
const router = express.Router();
​
router.post('/', Bookings.create);
router.get('/', Bookings.getAllBookings);
router.delete('/:bookingId', Bookings.deleteBooking);
​
export default router;