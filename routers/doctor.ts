import { Router } from 'express';
import { DoctorRecord } from '../records/doctor.record';
import { PatientRecord } from '../records/patient.record';
import { ValidationError } from '../utils/errors';
import { VisitRecord } from '../records/visit.record';

import { createHmac } from 'crypto';

import { SALT, SECRET_KEY } from '../ciphers';
import { Doctor } from '../types';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../utils/authenticate-token';
import { doc } from 'prettier';

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

    if (doctor) {
      const token = jwt.sign({ login: doctor.login, id: doctor.id }, SECRET_KEY, { expiresIn: '1h' });

      res.json({
        token,
      });
    }
    res.end();
  })
  .post('/find-doctors', async (req, res) => {
    const doctors: Doctor[] = await DoctorRecord.findDoctors(req.body.city, req.body.specialization);

    const dataDoctors = doctors.map((one: Doctor) => ({
      idDr: one.id,
      nameDr: one.name,
      lastNameDr: one.lastName,
      street: one.street,
      specialization: one.specialization,
    }));
    res.json(dataDoctors);

    res.end();
  })

  .post('/get-doctor', authenticateToken, async (req, res) => {
    const idDr: string = (req as any).parsedToken.id;
    const doctor: Doctor = await DoctorRecord.getOne(idDr);
    console.log(doctor);
    const dataDoctor = {
      id: doctor.id,
      login: doctor.login,
      name: doctor.name,
      lastName: doctor.lastName,
    };
    res.json(dataDoctor);
  });
