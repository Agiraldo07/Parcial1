import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getPatientAppointments } from '../controllers/patientController.js';

const router = express.Router();

router.get('/:patientId/appointment', authenticate, getPatientAppointments);

export default router;
