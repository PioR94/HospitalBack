import { Router } from 'express';
import { SpecializationRecord } from '../records/specialization.record';

export const specializationRouter = Router();

specializationRouter.get('/', async (req, res) => {
  const response = await SpecializationRecord.getAll();

  const specializations = response.map((r) => r.specialization);

  res.json(specializations);
});
