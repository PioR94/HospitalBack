import { Router } from 'express';
import { DoctorRecord } from '../records/doctor.record';
import { PatientRecord } from '../records/patient.record';
import { ValidationError } from '../utils/errors';
import { VisitRecord } from '../records/visit.record';

import { createHmac } from 'crypto';

import { SALT } from '../ciphers';
import { Doctor } from '../types';

export const doctorRouter = Router();

doctorRouter
  .post('/visits', async (req, res) => {
    const visits = await VisitRecord.getAllByDrId(req.body.doctorId);

    const dataVisits = visits.map((one) => ({
      idV: one.id,
      date: one.date,
      idPt: one.patientId,
    }));
    res.json(dataVisits);
  })

  .post('/visit', async (req, res) => {
    const visit = new VisitRecord(req.body);
    await visit.insert();
  })

  .post('/ad', async (req, res) => {
    const doctor = new DoctorRecord(req.body);

    const hash = createHmac('sha512', SALT).update(doctor.password).digest('hex');
    const drHash = new DoctorRecord({
      ...doctor,
      password: hash,
    });

    await drHash.insert();

    res.json(doctor);
    res.end();
  })

  .post('/log', async (req, res) => {
    const data = req.body;

    const hash = createHmac('sha512', SALT).update(data.password).digest('hex');

    const doctor = await DoctorRecord.getUserLogged(data.login, hash);

    if (doctor)
      res.json({
        log: true,
        id: doctor.id,
        login: doctor.login,
        name: doctor.name,
        lastName: doctor.lastName,
      });

    res.end();
  })
  .post('/find-doctors', async (req, res) => {
    console.log(req.body);

    const doctors: Doctor[] = await DoctorRecord.findDoctors(req.body.city, req.body.specialization);
    console.log(doctors);

    const dataDoctors = doctors.map((one: Doctor) => ({
      idDr: one.id,
      nameDr: one.name,
      lastNameDr: one.lastName,
      street: one.street,
      specialization: one.specialization,
    }));
    res.json(dataDoctors);

    res.end();
  });
