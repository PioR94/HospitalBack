import {Router} from "express";
import {DoctorRecord} from "../records/doctor.record";
import {PatientRecord} from "../records/patient.record";
import {ValidationError} from "../utils/errors";





export const patientRouter = Router();

patientRouter
    .get('/', async (req, res) => {



    })

    .post('/ad', async (req, res) => {
        const patients = await PatientRecord.getAll();
        const doctors = await DoctorRecord.getAll();
        const patient = new PatientRecord(req.body);

        const users = [...patients, ...doctors];




        const data = users.filter(one => {
            if (one.login === patient.login || one.mail === patient.mail) {
                throw new ValidationError('Login lub mail sa już zajęte');
            }
        })

        await patient.insert();
        res.json(patient);

    })