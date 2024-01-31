import { Router } from 'express';
import { DoctorRecord } from '../records/doctor.record';
import { createHmac } from 'crypto';
import { GOOGLE_API_KEY, SALT, SECRET_KEY } from '../ciphers';
import { Doctor } from '../types';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../utils/authenticate-token';
import { doc } from 'prettier';
import axios from 'axios';

export const doctorRouter = Router();

doctorRouter

  .post('/add', async (req, res) => {
    const doctor = new DoctorRecord(req.body);
    const hash = createHmac('sha512', SALT).update(doctor.password).digest('hex');
    const address = `${doctor.street}, ${doctor.code}, ${doctor.city}`;

    try {
      const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: GOOGLE_API_KEY,
        },
      });

      const location = geocodeResponse.data.results[0].geometry.location;

      const drHash = new DoctorRecord({
        ...doctor,
        password: hash,
        latitude: location.lat,
        longitude: location.lng,
      });

      await drHash.insert();

      res.json({ ...doctor, latitude: location.lat, longitude: location.lng });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error geocoding address');
    }
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
      city: one.city,
      price: one.price,
      latitude: one.latitude,
      longitude: one.longitude,
    }));
    res.json(dataDoctors);

    res.end();
  })

  .post('/get-user', authenticateToken, async (req, res) => {
    const idDr: string = (req as any).parsedToken.id;
    const doctor: Doctor = await DoctorRecord.getOne(idDr);

    if (!doctor) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dataDoctor = {
      id: doctor.id,
      login: doctor.login,
      name: doctor.name,
      lastName: doctor.lastName,
      mail: doctor.mail,
      street: doctor.street,
      code: doctor.code,
      city: doctor.city,
      specialization: doctor.specialization,
      price: doctor.price,
    };
    res.json(dataDoctor);
  })
  .put('/profile-settings', async (req, res) => {
    const dataProfile = req.body;
    const address = `${dataProfile.street}, ${dataProfile.code}, ${dataProfile.city}`;

    try {
      const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: GOOGLE_API_KEY,
        },
      });
      const location = geocodeResponse.data.results[0].geometry.location;
      const updateData = {
        ...dataProfile,
        latitude: location.lat,
        longitude: location.lng,
      };
      await DoctorRecord.updateProfile(updateData);
      console.log( updateData)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error geocoding address');
    }
  });
