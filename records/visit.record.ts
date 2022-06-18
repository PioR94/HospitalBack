import {Visit} from "../types";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";


export class VisitRecord implements Visit{
    id: string;
    date: object;

    constructor(obj: Visit) {
        this.id = obj.id;
        this.date = obj.date;
    }


    async insert() {
        if (!this.id) {
           this.id = uuid()
        }
        await pool.execute("INSERT INTO `visits` VALUES(:id, :date)", {
            id: this.id,
            date: this.date,
        })
    }
}