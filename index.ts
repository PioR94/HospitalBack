import express, {json} from "express";
import cors from "cors";
import 'express-async-errors'
import {handleError} from "./utils/errors";
import {DoctorRecord} from "./records/doctor.record";
import {User} from "./types";
import {doctorRouter} from "./routers/doctor";
import {VisitRecord} from "./records/visit.record";
import {encrypt} from "./bcrypt/becrypt";
import {patientRouter} from "./routers/patient";



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(handleError);



app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);





app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});