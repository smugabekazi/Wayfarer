import express from 'express';
import Bookings from '../controllers/bookings';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();
router.post('/',verifyToken, Bookings.create);
router.get('/', Bookings.getAllBookings);
router.delete('/:bookingId', Bookings.deleteBooking);
export default router;