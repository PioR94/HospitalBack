import { DoctorRecord } from '../records/doctor.record';
import { pool } from '../utils/db';
import { mockDoctor } from '../utils/mocks';

jest.mock('../utils/db', () => ({
  pool: {
    execute: jest.fn(),
  },
}));

describe('doctor.record.insert', () => {
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

describe('doctor.record.getOne', () => {
  it('retrieves the correct doctor based on id', async () => {
    const mockId = '1';

    pool.execute = jest.fn().mockResolvedValue([[mockDoctor], []]);

    const result = await DoctorRecord.getOne(mockId);

    expect(result).toHaveProperty('id', mockId);
  });
});

describe('doctor.record.findDoctors', () => {
  beforeEach(() => {
    pool.execute = jest.fn().mockResolvedValue([[], []]); // Resetowanie mocka przed każdym testem
  });

  it('builds correct query for both city and specialization provided', async () => {
    await DoctorRecord.findDoctors('CityName', 'SpecializationName');

    expect(pool.execute).toHaveBeenCalledWith(
      expect.stringContaining('WHERE city = :city AND specialization = :specialization'),

      expect.objectContaining({ city: 'CityName', specialization: 'SpecializationName' }),
    );
  });

  it('builds correct query for only city provided', async () => {
    await DoctorRecord.findDoctors('CityName', '');

    expect(pool.execute).toHaveBeenCalledWith(expect.stringContaining('WHERE city = :city'), expect.objectContaining({ city: 'CityName' }));
  });

  it('builds correct query for only specialization provided', async () => {
    await DoctorRecord.findDoctors('', 'SpecializationName');

    expect(pool.execute).toHaveBeenCalledWith(
      expect.stringContaining('WHERE specialization = :specialization'),

      expect.objectContaining({ specialization: 'SpecializationName' }),
    );
  });

  it('builds correct query for neither city nor specialization provided', async () => {
    await DoctorRecord.findDoctors('', '');

    expect(pool.execute).toHaveBeenCalledWith(expect.stringContaining('WHERE 1'), { city: '', specialization: '' });
  });
});
