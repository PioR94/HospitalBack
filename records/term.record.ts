import { Term } from '../types';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';

type AdRecordResults = [TermRecord[], FieldPacket[]];

export class TermRecord implements Term {
  id: string;
  hour: string;
  dayOfWeek: string;
  numberDay: string;
  month: string;
  year: string;
  idDr: string;
  idPt?: string;
  nameDr: string;
  lastNameDr: string;
  namePt: string;
  lastNamePt: string;
  price: string;

  constructor(obj: Term) {
    this.id = obj.id;
    this.hour = obj.hour;
    this.dayOfWeek = obj.dayOfWeek;
    this.numberDay = obj.numberDay;
    this.month = obj.month;
    this.year = obj.year;
    this.idDr = obj.idDr;
    this.idPt = obj.idPt;
    this.nameDr = obj.nameDr;
    this.lastNameDr = obj.lastNameDr;
    this.namePt = obj.namePt;
    this.lastNamePt = obj.lastNamePt;
    this.price = obj.price;
  }

  async insert(): Promise<void> {
    await pool.execute(
      'INSERT INTO `terms`(`id`, `hour`, `dayOfWeek`, `numberDay`, `month`, `year`, `idDr`, `idPt`, `nameDr`, `lastNameDr`, `namePt`, `lastNamePt`, `price`) VALUES(:id, :hour, :dayOfWeek, :numberDay, :month, :year, :idDr, :idPt, :nameDr, :lastNameDr, :namePt, :lastNamePt, :price)',
      {
        id: this.id,
        hour: this.hour,
        dayOfWeek: this.dayOfWeek,
        numberDay: this.numberDay,
        month: this.month,
        year: this.year,
        idDr: this.idDr,
        idPt: this.idPt,
        nameDr: this.nameDr,
        lastNameDr: this.lastNameDr,
        namePt: this.namePt,
        lastNamePt: this.lastNamePt,
        price: this.price,
      },
    );
  }

  static async getOne(id: string): Promise<Term | null> {
    const [results] = (await pool.execute('SELECT * FROM `terms` WHERE id = :id', {
      id,
    })) as AdRecordResults;

    return results.length === 0 ? null : new TermRecord(results[0]);
  }

  static async delete(id: string): Promise<void> {
    await pool.execute('DELETE FROM `terms` WHERE id = :id', {
      id,
    });
  }

  static async getTerms(numberDay: string, month: string, year: string, idDr: string): Promise<Term[] | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `terms` WHERE  numberDay = :numberDay AND month = :month AND year = :year AND idDr = :idDr',
      {
        numberDay,
        month,
        year,
        idDr,
      },
    )) as AdRecordResults;
    return results.map((obj) => obj);
  }

  static async findId(id: string): Promise<boolean> {
    const [results] = (await pool.execute('SELECT `id` FROM `terms` WHERE id = :id', {
      id,
    })) as AdRecordResults;

    return results.length !== 0;
  }

  static async bookTerm(id: string, idPt: string): Promise<void> {
    await pool.execute("UPDATE `terms` SET `reservation` = '1', `idPt` = :idPt WHERE id = :id", {
      id,
      idPt,
    });
  }

  static async getPatientTerms(idPt: string): Promise<Term[] | null> {
    const [results] = (await pool.execute('SELECT * FROM `terms` WHERE  idPt = :idPt', {
      idPt,
    })) as AdRecordResults;
    return results.map((obj) => obj);
  }

  static async getDoctorTerms(idDr: string): Promise<Term[] | null> {
    const [results] = (await pool.execute('SELECT * FROM `terms` WHERE  idDr = :idDr', {
      idDr,
    })) as AdRecordResults;
    return results.map((obj) => obj);
  }
}
