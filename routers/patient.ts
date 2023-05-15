import {Router} from "express";
import {DoctorRecord} from "../records/doctor.record";
import {PatientRecord} from "../records/patient.record";
import {ValidationError} from "../utils/errors";
import {Patient, User} from "../types";
import {VisitRecord} from "../records/visit.record";
import {createHmac} from "crypto";
import {SALT} from "../utils/cipher";



interface Login {
    login: string,
    password: string,
}



export const patientRouter = Router();

patientRouter

    .get('/', async (req, res) => {
        const doctors = await DoctorRecord.getAll();

       const dataDoctor = doctors.map(one => (
           {
               idDr: one.id,
               nameDr: one.name,
               lastNameDr: one.lastName,
               specialization: one.specialization,
               address: one.address,
           }
           )
        );

       res.json(dataDoctor)


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


        const hash = createHmac('sha512', SALT)
            .update(patient.password)
            .digest('hex');


        const patientHash = new PatientRecord({
            ...patient,
            password: hash,
        });


        await patientHash.insert();
        res.json(patient);


    })

    .post('/log', async (req, res) => {
        const data = req.body;
        console.log(req.body)


        const hash = createHmac('sha512', SALT)
            .update(data.password)
            .digest('hex');




        const patient = await PatientRecord.getUserLogged(data.login, hash);


       if (patient) res.json({
           log: true,
           id: patient.id,
           login: patient.login,
       })
        res.end();
    })




    .post('/visits', async (req, res) => {

        const visits = await VisitRecord.getAllByPtId(req.body.data);

        const dataVisits = visits.map(one => ({
            idV: one.id,
            date: one.date,
            idDr: one.doctorId,
        }))

        res.json(dataVisits);

    })