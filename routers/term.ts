import {Router} from "express";
import {TermRecord} from "../records/term.record";


export const termRouter = Router();

termRouter
    .get('/', (req, res) => {

})
    .post('/add', async (req, res) => {

        console.log(req.body);

        const term = new TermRecord(req.body)

        await TermRecord.getOne(term.id) ? await TermRecord.delete(term.id) :  await term.insert();

        res.end();
    })


