import { FieldPacket } from 'mysql2';

import { pool } from '../utils/db';
import { Schedule } from '../types/schedules/schedule';

type AdRecordResults = [ScheduleRecord[], FieldPacket[]];

export class ScheduleRecord implements Schedule {
  id?: string;
  idDr: string;
  day: string;
  hour: string;

  constructor(obj: Schedule) {
    this.idDr = obj.idDr;
    this.day = obj.day;
    this.hour = obj.hour;
  }

  static async getAllById(idDr: string): Promise<Schedule[]> {
    const [results] = (await pool.execute('SELECT * FROM `schedules` WHERE idDr = :idDr', { idDr })) as AdRecordResults;

    return results.map((obj) => new ScheduleRecord(obj));
  }

  static async getAllForOneDay(idDr: string, day: string): Promise<Schedule[]> {
    const [results] = (await pool.execute('SELECT * FROM `schedules` WHERE idDr = :idDr AND day = :day', { idDr, day })) as AdRecordResults;

    return results.map((obj) => new ScheduleRecord(obj));
  }

  static async deleteHours(idDr: string): Promise<void> {
    await pool.execute('DELETE FROM `schedules` WHERE idDr = :idDr', { idDr });
  }

  static async addHours(hours: Schedule[]): Promise<void> {
    const values = hours.map((hour) => `('${hour.idDr}', '${hour.day}', '${hour.hour}')`).join(',');

    await pool.execute(`INSERT INTO schedules (idDr, day, hour) VALUES ${values}`);
  }
}
