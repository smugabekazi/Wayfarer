import express from 'express';
import userRouter from './routes/users';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/api/v1/auth', userRouter);
export default app;