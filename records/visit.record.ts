import {Visit} from "../types";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {PatientRecord} from "./patient.record";


type AdRecordResults = [VisitRecord[], FieldPacket[]];


export class VisitRecord implements Visit {
    id?: string;
    date: object;

    constructor(obj: Visit) {
        this.id = obj.id;
        this.date = obj.date;
    }


    async insert(): Promise<void> {
        if (!this.id) {
           this.id = uuid()
        }
        await pool.execute("INSERT INTO `visits` VALUES(:id, :date)", {
            id: this.id,
            date: this.date,
        })
    }


    static async getOne(id: string): Promise<Visit | null> {
        const [results] = await pool.execute("SELECT * FROM `visits` WHERE :id = id", {
            id,
        }
        ) as AdRecordResults;
        return results.length === 0 ? null : new VisitRecord(results[0]);
    }

    static async getAll(): Promise<Visit[]>{
       const [results] = await pool.execute("SELECT * FROM `visits`") as AdRecordResults

        return results.map(obj => new VisitRecord(obj));
    }
}