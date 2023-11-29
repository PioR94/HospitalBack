import { Router } from 'express';
import { TermRecord } from '../records/term.record';
import { FreeTerm } from '../types';
import { authenticateToken } from '../utils/authenticate-token';
import axios from 'axios';

export const termRouter = Router();

termRouter
  .post('/term-id', async (req, res) => {
    const termId = req.body.data;
    const r = await TermRecord.findId(termId);
    res.json(r);
    res.end();
  })

  .post('/add', async (req, res) => {
    const term = new TermRecord(req.body);

    await term.insert();

    res.end();
  })

  .post('/free-terms', async (req, res) => {
    const dayData = req.body;

    const freeTerms: FreeTerm[] = await TermRecord.getFreeTerms(dayData.numberDay, dayData.month, dayData.year, dayData.idDr);
    res.json(freeTerms);

    res.end();
  })

  .post('/book-term', authenticateToken, async (req, res) => {
    const termId = req.body.termId;
    const idPt: string = (req as any).parsedToken.id;
    console.log(req.body);
    await TermRecord.bookTerm(termId, idPt);

    res.end();
  });
