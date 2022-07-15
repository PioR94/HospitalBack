import {Patient} from "../types";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import { pool } from "../utils/db";
import {v4 as uuid} from "uuid";

type AdRecordResults = [PatientRecord[], FieldPacket[]];

export class PatientRecord implements Patient {
    id?: string;
    login: string;
    password: string;
    mail: string;
    name: string;
    lastName: string;
    address: string;


    constructor (obj: Patient) {
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


        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
        this.mail = obj.mail;
        this.name = obj.name;
        this.lastName = obj.lastName;
        this.address = obj.address;


    }


    static async getOne(id: string): Promise<Patient | null> {
        const [results] = await pool.execute("SELECT * FROM `patients` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new PatientRecord(results[0])
    };

    static async getUserLogged(login: string, password: string): Promise<Patient | null> {
        const [results] = await pool.execute("SELECT * FROM `patients` WHERE login = :login AND password = :password", {
            login,
            password,
        }) as AdRecordResults;
        return results.length === 0 ? null : new PatientRecord(results[0]);
    }


    static async getAll(): Promise<Patient[]> {
        const [results] = await pool.execute("SELECT * FROM `patients`") as AdRecordResults

        return results.map(obj => new PatientRecord(obj));
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `patients`(`id`, `login`,`password`, `mail`, `name`, `lastName`, `address`) VALUES(:id, :login, :password, :mail, :name, :lastName, :address)", {
            id: this.id,
            login: this.login,
            password: this.password,
            mail: this.mail,
            name: this.name,
            lastName: this.lastName,
            address: this.address,
        });
    }


}