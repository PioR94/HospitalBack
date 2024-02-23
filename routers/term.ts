import { Router } from 'express';
import { TermRecord } from '../records/term.record';
import { ScheduleHour, Term } from '../types';
import { authenticateToken } from '../utils/authenticate-token';
import axios from 'axios';
import { json } from 'stream/consumers';

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

  .post('/terms', async (req, res) => {
    const { idDr, numberDay, month, year } = req.body;

    const terms: Term[] = await TermRecord.getTerms(numberDay, month, year, idDr);

    const hours: ScheduleHour[] = terms.map((item: Term) => ({
      id: item.id,
      idDr: item.idDr,
      day: item.dayOfWeek,
      hour: item.hour,
    }));

    res.json(hours);

    res.end();
  })

  .post('/patient-terms', async (req, res) => {
    const userId = req.body.data;

    const terms: Term[] = await TermRecord.getPatientTerms(userId);

    const dataTerms = terms.map((item: Term) => ({
      id: item.id,
      name: item.nameDr,
      lastName: item.lastNameDr,
      numberDay: item.numberDay,
      month: item.month,
      year: item.year,
      hour: item.hour,
      price: item.price,
      status: item.status,
    }));

    res.json(dataTerms);

    res.end();
  })

  .post('/doctor-terms', async (req, res) => {
    const userId = req.body.data;

    const terms: Term[] = await TermRecord.getDoctorTerms(userId);

    const dataTerms = terms.map((item: Term) => ({
      id: item.id,
      name: item.namePt,
      lastName: item.lastNamePt,
      numberDay: item.numberDay,
      month: item.month,
      year: item.year,
      hour: item.hour,
      price: item.price,
      status: item.status,
    }));

    res.json(dataTerms);

    res.end();
  });
