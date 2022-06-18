import express, {json} from "express";
import cors from "cors";
import 'express-async-errors'
import {handleError} from "./utils/errors";
import {DoctorRecord} from "./records/doctor.record";
import {User} from "./types";
import {doctorRouter} from "./routers/doctor";
import {VisitRecord} from "./records/visit.record";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(handleError);


app.use('/doctor', doctorRouter);



const obj = new VisitRecord({
    id: 'sqaedqww',
    date: new Date(),
})

obj.insert();


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});