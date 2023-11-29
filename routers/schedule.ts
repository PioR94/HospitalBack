import { Router } from 'express';
import { ScheduleRecord } from '../records/schedule.record';

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

    console.log(schedule);

    res.json(schedule);
  })
  .post('/free-terms', async (req, res) => {
    const { dayOfWeek, idDr } = req.body;

    const hours = await ScheduleRecord.getAllForOneDay(idDr, dayOfWeek);

    res.json(hours);
    console.log(hours);
    res.end();
  });
