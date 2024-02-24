import { DoctorRecord } from '../records/doctor.record';
import { pool } from '../utils/db';
import { mockDoctor } from '../utils/mocks';

jest.mock('../utils/db', () => ({
  pool: {
    execute: jest.fn(),
  },
}));

describe('Insert', () => {
  const doctor = new DoctorRecord(mockDoctor);

  it('calls pool.execute with correct SQL query for insert', async () => {
    await doctor.insert();

    expect(pool.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO `doctors`'), expect.anything());
  });

  it('calls pool.execute with correct data structure', async () => {
    const doctor = new DoctorRecord(mockDoctor);

    await doctor.insert();

    expect(pool.execute).toHaveBeenCalledWith(
      expect.anything(),

      expect.objectContaining({
        id: mockDoctor.id,
        login: mockDoctor.login,
        password: mockDoctor.password,
        mail: mockDoctor.mail,
        name: mockDoctor.name,
        lastName: mockDoctor.lastName,
        street: mockDoctor.street,
        code: mockDoctor.code,
        city: mockDoctor.city,
        specialization: mockDoctor.specialization,
        latitude: mockDoctor.latitude,
        longitude: mockDoctor.longitude,
      }),
    );
  });
});


