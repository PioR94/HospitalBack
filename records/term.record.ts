import {Term} from "../types";
import {v4 as uuid} from "uuid";
import { pool } from "../utils/db";
import {FieldPacket} from "mysql2";


type AdRecordResults = [TermRecord[], FieldPacket[]]

export class TermRecord implements Term {
    id: string;
    hour: string;
    dayOfWeek: string;
    numberDay: string;
    month: string;
    year: string;
    idDr: string;
    loginDr: string;
    nameDr: string;
    lastNameDr: string;
    reservation?: number;

    constructor (obj: Term) {
        this.id = obj.id;
        this.hour = obj.hour;
        this.dayOfWeek = obj.dayOfWeek;
        this.numberDay = obj.numberDay;
        this.month = obj.month;
        this.year = obj.year;
        this.idDr = obj.idDr;
        this.loginDr =obj.loginDr;
        this.nameDr = obj.nameDr;
        this.lastNameDr = obj.lastNameDr;
        this.reservation = obj.reservation;
    }

    async insert(): Promise<void> {
        // if (!this.id) this.id = uuid();

        await pool.execute("INSERT INTO `terms`(`id`, `hour`, `dayOfWeek`, `numberDay`, `month`, `year`, `idDr`, `loginDr`, `nameDr`, `lastNameDr`) VALUES(:id, :hour, :dayOfWeek, :numberDay, :month, :year, :idDr, :loginDr, :nameDr, :lastNameDr)", {
            id: this.id,
            hour: this.hour,
            dayOfWeek: this.dayOfWeek,
            numberDay: this.numberDay,
            month: this.month,
            year: this.year,
            idDr: this.idDr,
            loginDr: this.loginDr,
            nameDr: this.nameDr,
            lastNameDr: this.lastNameDr,
            reservation: 0,
        })
    }

    static async getOne(id: string): Promise<Term | null> {
       const [results] = await pool.execute("SELECT * FROM `terms` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new TermRecord(results[0]);
    }

    static async delete(id: string): Promise<void> {
        await pool.execute("DELETE FROM `terms` WHERE id = :id", {
            id,
        })
    }

    static async getFreeTerms(numberDay: string, month: string, year: string, idDr: string): Promise<Term[] | null> {
       const [results] = await pool.execute("SELECT `id`, `hour`, `numberDay`, `month`, `year`, `reservation` FROM `terms` WHERE  numberDay = :numberDay AND month = :month AND year = :year AND idDr = :idDr", {
            numberDay,
            month,
            year,
            idDr,
        }) as AdRecordResults;
        return results.map(obj => obj)
    }

    static async findId(id: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT `id` FROM `terms` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length !== 0;
    }
}