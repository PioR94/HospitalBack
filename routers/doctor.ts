import {Router} from "express";
import {DoctorRecord} from "../records/doctor.record";
import {PatientRecord} from "../records/patient.record";
import {ValidationError} from "../utils/errors";





export const doctorRouter = Router();

    doctorRouter
        .get('/', async (req, res) => {



        })

        .post('/ad', async (req, res) => {
            const patients = await PatientRecord.getAll();
            const doctors = await DoctorRecord.getAll();
            const doctor = new DoctorRecord(req.body);

            const users = [...patients, ...doctors];




            const data = users.filter(one => {
                if (one.login === doctor.login || one.mail === doctor.mail) {
                    throw new ValidationError('Login lub mail sa już zajęte');
                }
            })

            await doctor.insert();
            res.json(doctor);

        })