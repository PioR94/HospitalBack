import { Router } from 'express';
import { PatientRecord } from '../records/patient.record';
import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../utils/authenticate-token';
import axios from 'axios';
import { Patient } from '../types';
const SALT = process.env.SALT;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

export const patientRouter = Router();

patientRouter

  .post('/add', async (req, res) => {
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
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&types=(cities)&language=pl&components=country:PL&key=${GOOGLE_API_KEY}`,
      )

      .then(function (response) {
        const predictions = response.data.predictions;

        const mainTexts = predictions.map((prediction: any) => prediction.structured_formatting.main_text);

        res.json(mainTexts);

        res.end();
      });
  })

  .post('/get-user', authenticateToken, async (req, res) => {
    const idPt: string = (req as any).parsedToken.id;

    const patient: Patient = await PatientRecord.getOne(idPt);

    if (!patient) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dataPatient = {
      idUser: patient.id,
      login: patient.login,
      name: patient.name,
      lastName: patient.lastName,
      mail: patient.mail,
      street: patient.street,
      code: patient.code,
      city: patient.city,
    };

    res.json(dataPatient);
  })

  .put('/profile-settings', async (req, res) => {
    await PatientRecord.updateProfile(req.body);
  });
