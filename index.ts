import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { doctorRouter } from './routers/doctor';
import { patientRouter } from './routers/patient';
import { termRouter } from './routers/term';
import { specializationRouter } from './routers/specialization';
import { scheduleRouter } from './routers/schedule';
import { paymentRouter } from './routers/payment';

const app = express();

const baseUrl = process.env.BASE_URL;

app.use(
  cors({
    origin: baseUrl,
  }),
);
app.use(json());

app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/term', termRouter);
app.use('/specialization', specializationRouter);
app.use('/schedule', scheduleRouter);
app.use('/payment', paymentRouter);

app.listen(3001, '0.0.0.0', () => {
  console.log('Listening on port http://localhost:3001');
});
