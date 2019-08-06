import express from 'express';
import Trips from '../controllers/trips';
const router = express.Router();
router.post('/', Trips.create);
export default router;