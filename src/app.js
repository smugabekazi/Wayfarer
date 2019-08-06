import express from 'express';
import userRouter from './routes/users';
import tripRouter from './routes/trips';
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/trip', tripRouter);
export default app;