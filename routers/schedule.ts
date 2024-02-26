import { Router } from 'express';
import { ScheduleRecord } from '../records/schedule.record';
import { Schedule } from '../types/schedules/schedule';

export const scheduleRouter = Router();

scheduleRouter

  .put('/update', async (req, res) => {
    const { idDr, newSchedule } = req.body;

    await ScheduleRecord.deleteHours(idDr);

    await ScheduleRecord.addHours(newSchedule);

    res.end();
  })

  .post('/hours', async (req, res) => {
    const idDr = req.body.data;

    const schedule = await ScheduleRecord.getAllById(idDr);

    res.json(schedule);

    res.end();
  })

  .post('/free-terms', async (req, res) => {
    const { dayOfWeek, idDr } = req.body;

    const hours: Schedule[] = await ScheduleRecord.getAllForOneDay(idDr, dayOfWeek);

    res.json(hours);

    res.end();
  });
