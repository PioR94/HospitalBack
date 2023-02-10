import {Router} from "express";
import {TermRecord} from "../records/term.record";
import {FreeTerm} from "../types";


export const termRouter = Router();

termRouter
    .post('/term-id', async (req, res) => {
           const termId = req.body.termId;

           const r = await TermRecord.findId(termId);
           res.json(r);

           res.end();
    })

    .post('/add', async (req, res) => {

       const term = new TermRecord(req.body)

       await TermRecord.getOne(term.id) ? await TermRecord.delete(term.id) :  await term.insert();

        res.end();

    })

    .post('/free-terms', async (req, res) => {
        const dayData = req.body;


        const freeTerms: FreeTerm[] = await TermRecord.getFreeTerms(dayData.numberDay, dayData.month, dayData.year, dayData.idDr);
        res.json(freeTerms);

        console.log(freeTerms);
        res.end();


    })



