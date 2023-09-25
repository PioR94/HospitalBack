import {FieldPacket} from "mysql2";
import {Specialization, Visit} from "../types";
import {pool} from "../utils/db";


type AdRecordResults = [SpecializationRecord[], FieldPacket[]];


export class SpecializationRecord implements Specialization {
    id: string;
    specialization: string;

    constructor(obj: Specialization) {
        this.id = obj.id;
        this.specialization = obj.specialization;
    }

    static async getAll(): Promise<Specialization[]>{
        const [results] = await pool.execute("SELECT * FROM `specializations`") as AdRecordResults

        return results.map(obj => new SpecializationRecord(obj));
    }

}