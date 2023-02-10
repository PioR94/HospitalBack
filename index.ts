import express, {json} from "express";
import cors from "cors";
import 'express-async-errors'
import {handleError} from "./utils/errors";
import {doctorRouter} from "./routers/doctor";
import {patientRouter} from "./routers/patient";
import {visitRouter} from "./routers/visit";
import {termRouter} from "./routers/term";



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(handleError);



app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/visit', visitRouter);
app.use('/term', termRouter);


const date = new Date();



app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});