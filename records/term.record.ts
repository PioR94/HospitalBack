import {Term} from "../types";
import {v4 as uuid} from "uuid";
import { pool } from "../utils/db";

export class TermRecord implements Term {
    id: string;
    hour: string;
    dayOfWeek: string;
    numberDay: string;
    month: string;
    year: number;
    idDr: string;
    loginDr: string;
    nameDr: string;
    lastNameDr: string;

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
    }

    async insert(): Promise<void> {
        if (!this.id) this.id = uuid();

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
        })
    }


}