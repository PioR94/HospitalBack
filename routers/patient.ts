import { Router } from 'express';
import { DoctorRecord } from '../records/doctor.record';
import { PatientRecord } from '../records/patient.record';
import { VisitRecord } from '../records/visit.record';
import { API_KEY, SALT, SECRET_KEY } from '../ciphers';
import { createHmac } from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { authenticateToken } from '../utils/authenticate-token';
import axios from 'axios';
import { Doctor } from '../types';

interface Login {
  login: string;
  password: string;
}

export const patientRouter = Router();

patientRouter

  .post('/ad', async (req, res) => {
    const patient = new PatientRecord(req.body);

    const hash = createHmac('sha512', SALT).update(patient.password).digest('hex');

    const patientHash = new PatientRecord({
      ...patient,
      password: hash,
    });

    await patientHash.insert();

    res.json(patient);
    res.end();
  })

  .post('/log', async (req, res) => {
    const data = req.body;
    const hash = createHmac('sha512', SALT).update(data.password).digest('hex');

    const patient = await PatientRecord.getUserLogged(data.login, hash);

    if (patient) {
      const token = jwt.sign({ login: patient.login, id: patient.id }, SECRET_KEY, { expiresIn: '1h' });

      res.json({
        token,
      });
    }
    res.end();
  })

  .post('/visits', async (req, res) => {
    const visits = await VisitRecord.getAllByPtId(req.body.data);

    const dataVisits = visits.map((one) => ({
      idV: one.id,
      date: one.date,
      idDr: one.doctorId,
    }));

    res.json(dataVisits);
  })
  .post('/get-id', authenticateToken, (req, res) => {
    const idPt: string = (req as any).parsedToken.id;
    res.json({
      idPt,
    });
  })
  .post('/google-api', (req, res) => {
    const inputText = req.body.data;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&types=(cities)&language=pl&components=country:PL&key=${API_KEY}`,
      )

      .then(function (response) {
        const predictions = response.data.predictions;
        const mainTexts = predictions.map((prediction: any) => prediction.structured_formatting.main_text);

        res.json(mainTexts);

        res.end();
      });
  });
