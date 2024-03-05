import { ScheduleRecord } from '../records/schedule.record';
import { pool } from '../utils/db';
import { mockSchedulesData } from '../utils/mocks';

jest.mock('../utils/db', () => ({
  pool: {
    execute: jest.fn(),
  },
}));

describe('scheduleRecord.getAllById', () => {
  it('retrieves only schedules matching the doctor id 11 ', async () => {
    const correctDoctorId = '11';

    pool.execute = jest.fn().mockResolvedValue([mockSchedulesData, []]);

    const results = await ScheduleRecord.getAllById(correctDoctorId);

    expect(results.every((result) => result.idDr === correctDoctorId)).toBeTruthy();

    expect(results).toHaveLength(mockSchedulesData.filter((schedule) => schedule.idDr === correctDoctorId).length);
  });
});
