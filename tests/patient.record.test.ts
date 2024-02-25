import { PatientRecord } from '../records/patient.record';
import { ScheduleRecord } from '../records/schedule.record';
import { pool } from '../utils/db';
import { mockPatient, mockPatientsResults, mockSchedulesData } from '../utils/mocks';

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

describe('patient.record.getAll', () => {
  it('returns a list of PatientRecords based on database results', async () => {
    pool.execute = jest.fn().mockResolvedValue([mockPatientsResults, []]);

    const results = await PatientRecord.getAll();

    expect(results).toHaveLength(mockPatientsResults.length);

    results.forEach((result, index) => {
      expect(result).toBeInstanceOf(PatientRecord);

      expect(result).toMatchObject(mockPatientsResults[index]);
    });
  });

  it('returns an empty array when no patients are found', async () => {
    pool.execute = jest.fn().mockResolvedValue([[], []]);

    const results = await PatientRecord.getAll();

    expect(results).toEqual([]);
  });
});
