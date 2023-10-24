import { Visit } from '../types';
import { pool } from '../utils/db';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { PatientRecord } from './patient.record';

type AdRecordResults = [VisitRecord[], FieldPacket[]];

export class VisitRecord implements Visit {
  id?: string;
  date: object;
  doctorId: string;
  patientId?: string;

  constructor(obj: Visit) {
    this.id = obj.id;
    this.date = obj.date;
    this.doctorId = obj.doctorId;
    this.patientId = obj.patientId;
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute('INSERT INTO `visits` VALUES(:id, :date, :doctorId, :patientId)', {
      id: this.id,
      date: this.date,
      doctorId: this.doctorId,
      patientId: this.patientId,
    });
  }

  static async getOne(id: string): Promise<Visit | null> {
    const [results] = (await pool.execute('SELECT * FROM `visits` WHERE :id = id', {
      id,
    })) as AdRecordResults;
    return results.length === 0 ? null : new VisitRecord(results[0]);
  }

  static async getAll(): Promise<Visit[]> {
    const [results] = (await pool.execute('SELECT * FROM `visits`')) as AdRecordResults;

    return results.map((obj) => new VisitRecord(obj));
  }

  static async getAllByDrId(doctorId: string): Promise<Visit[]> {
    const [results] = (await pool.execute('SELECT * FROM `visits` WHERE :doctorId = doctorId', {
      doctorId,
    })) as AdRecordResults;

    return results.map((obj) => new VisitRecord(obj));
  }

  static async getAllByPtId(patientId: string): Promise<Visit[]> {
    const [results] = (await pool.execute('SELECT * FROM `visits` WHERE :patientId = patientId', {
      patientId,
    })) as AdRecordResults;

    return results.map((obj) => new VisitRecord(obj));
  }
}
