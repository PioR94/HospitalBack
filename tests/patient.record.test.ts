import { PatientRecord } from '../records/patient.record';
import { pool } from '../utils/db';
import { mockPatient } from '../utils/mocks';

jest.mock('../utils/db', () => ({
  pool: {
    execute: jest.fn(),
  },
}));

describe('patient.record.getUserLogged', () => {
  it('returns a patient record for correct login and password', async () => {
    pool.execute = jest.fn().mockResolvedValue([[mockPatient], []]);

    const result = await PatientRecord.getUserLogged('patient', '1111');

    expect(result).toEqual(
      expect.objectContaining({
        id: '2',
        login: 'patient',
        password: '1111',
        mail: 'patient@o2.pl',
        name: 'John',
        lastName: 'Smith',
        street: 'Long Street',
        code: '22-22',
        city: 'London',
      }),
    );
  });

  it('returns null for incorrect login and password', async () => {
    pool.execute = jest.fn().mockResolvedValue([[], []]);

    const result = await PatientRecord.getUserLogged('wrongLogin', 'wrongPassword');

    expect(result).toBeNull();
  });
});
