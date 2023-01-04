import {Router} from "express";
import {TermRecord} from "../records/term.record";


export const termRouter = Router();

termRouter
    .get('/', (req, res) => {

})
    .post('/add', (req, body) => {
        const term = new TermRecord(req.body)

        term.insert();
    })


