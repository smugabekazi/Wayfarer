import express from 'express';
import userRouter from './routes/users';
import tripRouter from './routes/trips';
import bookingRouter from'./routes/bookings';

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/trip', tripRouter);
app.use('/api/v1/booking', bookingRouter);
export default app;
