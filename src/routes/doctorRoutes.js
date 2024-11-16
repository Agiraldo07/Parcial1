import express from 'express';
import { getPatient, getAppointments, login, createAppointment, updateAppointment, deleteAppointment } from '../controllers/doctorController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/appointment', authenticate, getAppointments);
router.post('/appointment', authenticate, createAppointment);
router.put('/appointment/:appointmentId', authenticate, updateAppointment);
router.delete('/appointment/:appointmentId', authenticate, deleteAppointment);
router.get('/patient/:patientId', authenticate, getPatient);

export default router;
