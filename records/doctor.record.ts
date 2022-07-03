import {Doctor, Patient, User} from "../types";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import { pool } from "../utils/db";
import {v4 as uuid} from "uuid";

type AdRecordResults = [DoctorRecord[], FieldPacket[]];

export class DoctorRecord implements Doctor {
    id?: string;
    login: string;
    password: string;
    mail: string;
    name: string;
    lastName: string;
    address: string;
    specialization: string;
    visitId?: string;

    constructor (obj: Doctor) {
        if (obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Imie musi zawierać się między 3 a 25 znaków')
        }
        if (obj.lastName.length < 3 || obj.lastName.length > 36) {
            throw new ValidationError('Nazwisko musi zawierać się między 3 a 36 znaków')
        }
        if (obj.address.length < 3 || obj.address.length > 50) {
            throw new ValidationError('Adres musi zawierać się między 3 a 50 znaków')
        }
        if (obj.password.length < 8 || obj.lastName.length > 50) {
            throw new ValidationError('Hasło musi zawierać się między 8 a 50 znaków')
        }
        if (obj.specialization.length > 25) {
            throw new ValidationError('błąd');
        }




        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
        this.mail = obj.mail;
        this.name = obj.name;
        this.lastName = obj.lastName;
        this.address = obj.address;
        this.specialization = obj.specialization;
        this.visitId = obj.visitId;

    }


    static async getOne(id: string): Promise<Doctor | null> {
        const [results] = await pool.execute("SELECT * FROM `doctors` WHERE id = :id", {
            id,
        }) as AdRecordResults



        return results.length === 0 ? null : new DoctorRecord(results[0])
    }

    static async getAll(): Promise<Doctor[]> {
        const [results] = await pool.execute("SELECT * FROM `doctors`") as AdRecordResults

        return results.map(obj => new DoctorRecord(obj));
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `doctors`(`id`, `login`,`password`, `mail`, `name`, `lastName`, `address`, `specialization`) VALUES(:id, :login, :password, :mail, :name, :lastName, :address, :specialization)", {
            id: this.id,
            login: this.login,
            password: this.password,
            mail: this.mail,
            name: this.name,
            lastName: this.lastName,
            address: this.address,
            specialization: this.specialization,
        });
    }


    }