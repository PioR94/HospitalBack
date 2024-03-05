process.env.SALT = 'your-mock-salt-value';
process.env.SECRET_KEY = 'your-secret-key';
import request from 'supertest';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { doctorRouter } from '../routers/doctor';
import { DoctorRecord } from '../records/doctor.record';
import { mockDoctor } from '../utils/mocks';

jest.mock('../records/doctor.record', () => ({
  DoctorRecord: {
    getUserLogged: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked.jwt.token'),
}));

describe('doctor-post-doctor/log', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use('/doctor', doctorRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return JWT token for valid login and password', async () => {
    (DoctorRecord.getUserLogged as jest.Mock).mockResolvedValue(mockDoctor);

    const response = await request(app).post('/doctor/log').send({ login: 'doctor11', password: '1111' });

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty('token', 'mocked.jwt.token');

    expect(jwt.sign).toHaveBeenCalledWith({ login: 'doctor11', id: '1' }, expect.any(String), { expiresIn: '1h' });
  });

  it('should return error for invalid login or password', async () => {
    (DoctorRecord.getUserLogged as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post('/doctor/log').send({ login: 'wrongLogin', password: 'wrongPassword' });

    expect(response.statusCode).toBe(401);

    expect(response.body).toHaveProperty('error');
  });
});
