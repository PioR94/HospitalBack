import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleError } from './utils/errors';
import { doctorRouter } from './routers/doctor';
import { patientRouter } from './routers/patient';
import { termRouter } from './routers/term';
import { specializationRouter } from './routers/specialization';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(json());
app.use(handleError);

app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/term', termRouter);
app.use('/specialization', specializationRouter);

app.listen(3001, '0.0.0.0', () => {
  console.log('Listening on port http://localhost:3001');
});
