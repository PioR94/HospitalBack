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
    name: string;
    lastName: string;
    age: number;
    address: string;
    visitId?: string;

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
        this.name = obj.name;
        this.login = obj.login;
        this.password = obj.password;
        this.lastName = obj.lastName;
        this.age = obj.age;
        this.address = obj.address;
        this.visitId = obj.visitId;

    }


    static async getOne(id: string): Promise<Patient | null> {
        const [results] = await pool.execute("SELECT * FROM `patient` WHERE id = :id", {
            id,
        }) as AdRecordResults



        return results.length === 0 ? null : new PatientRecord(results[0])
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `patients`(`id`, `login`,`password`, `name`, `lastName`, `age`, `address`) VALUES(:id, :login, :password, :name, :lastName, :age, :address)", {
            id: this.id,
            login: this.login,
            password: this.password,
            name: this.name,
            lastName: this.lastName,
            age: this.age,
            address: this.address,
        });
    }


}