import { Patient } from '../types';
import { ValidationError } from '../utils/errors';
import { FieldPacket } from 'mysql2';
import { pool } from '../utils/db';
import { v4 as uuid } from 'uuid';

type AdRecordResults = [PatientRecord[], FieldPacket[]];

export class PatientRecord implements Patient {
  id?: string;
  login: string;
  password: string;
  mail: string;
  name: string;
  lastName: string;
  street: string;
  code: string;
  city: string;

  constructor(obj: Patient) {
    this.id = obj.id;
    this.login = obj.login;
    this.password = obj.password;
    this.mail = obj.mail;
    this.name = obj.name;
    this.lastName = obj.lastName;
    this.street = obj.street;
    this.code = obj.code;
    this.city = obj.city;
  }

  static async getOne(id: string): Promise<Patient | null> {
    const [results] = (await pool.execute('SELECT * FROM `patients` WHERE id = :id', {
      id,
    })) as AdRecordResults;

    return results.length === 0 ? null : new PatientRecord(results[0]);
  }

  static async getUserLogged(login: string, password: string): Promise<Patient | null> {
    const [results] = (await pool.execute('SELECT * FROM `patients` WHERE login = :login AND password = :password', {
      login,
      password,
    })) as AdRecordResults;
    return results.length === 0 ? null : new PatientRecord(results[0]);
  }

  static async getAll(): Promise<Patient[]> {
    const [results] = (await pool.execute('SELECT * FROM `patients`')) as AdRecordResults;

    return results.map((obj) => new PatientRecord(obj));
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      'INSERT INTO `patients`(`id`, `login`, `password`, `mail`, `name`, `lastName`, `street`, `code`, `city`) VALUES(:id, :login, :password, :mail, :name, :lastName,  :street, :code, :city)',
      {
        id: this.id,
        login: this.login,
        password: this.password,
        mail: this.mail,
        name: this.name,
        lastName: this.lastName,
        street: this.street,
        code: this.code,
        city: this.city,
      },
    );
  }
}
