import { Doctor, Patient, User } from '../types';
import { ValidationError } from '../utils/errors';
import { FieldPacket } from 'mysql2';
import { pool } from '../utils/db';
import { v4 as uuid } from 'uuid';
import { PatientRecord } from './patient.record';

type AdRecordResults = [DoctorRecord[], FieldPacket[]];

export class DoctorRecord implements Doctor {
  id?: string;
  login: string;
  password: string;
  mail: string;
  name: string;
  lastName: string;
  street: string;
  code: string;

  city: string;
  specialization: string;

  constructor(obj: Doctor) {
    this.id = obj.id;
    this.login = obj.login;
    this.password = obj.password;
    this.mail = obj.mail;
    this.name = obj.name;
    this.lastName = obj.lastName;

    this.street = obj.street;
    this.code = obj.code;
    this.city = obj.city;
    this.specialization = obj.specialization;
  }

  static async getOne(id: string): Promise<Doctor | null> {
    const [results] = (await pool.execute('SELECT * FROM `doctors` WHERE id = :id', {
      id,
    })) as AdRecordResults;
    return results.length === 0 ? null : new DoctorRecord(results[0]);
  }

  static async getAll(): Promise<Doctor[]> {
    const [results] = (await pool.execute('SELECT * FROM `doctors`')) as AdRecordResults;

    return results.map((obj) => new DoctorRecord(obj));
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      'INSERT INTO `doctors`(`id`, `login`,`password`, `mail`, `name`, `lastName`, `street`,`code`, `city`, `specialization`) VALUES(:id, :login, :password, :mail, :name, :lastName, :street, :code, :city, :specialization)',
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
        specialization: this.specialization,
      },
    );
  }

  static async getUserLogged(login: string, password: string): Promise<Doctor | null> {
    const [results] = (await pool.execute('SELECT * FROM `doctors` WHERE login = :login AND password = :password', {
      login,
      password,
    })) as AdRecordResults;
    return results.length === 0 ? null : new DoctorRecord(results[0]);
  }

  static async findDoctors(city: string, specialization: string): Promise<Doctor[] | null> {
    let query = 'SELECT * FROM `doctors` WHERE';

    if (city && specialization) {
      query += ' city = :city AND specialization = :specialization';
    } else if (city) {
      query += ' city = :city';
    } else if (specialization) {
      query += ' specialization = :specialization';
    } else {
      query += ' 1';
    }

    const params = {
      city,
      specialization,
    };

    const [results] = (await pool.execute(query, params)) as AdRecordResults;

    return results.map((obj) => new DoctorRecord(obj));
  }
}
