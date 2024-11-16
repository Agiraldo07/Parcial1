import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import Doctor from '../models/Doctor.js';
import MedicalAppointment from '../models/MedicalAppointment.js';
import Patient from '../models/Patient.js';

// Login del médico y generación de token JWT
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ where: { email, password } });
        if (!doctor) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Obtener los datos de un paciente específico
export const getPatient = async (req, res) => {
    const { patientId } = req.params;
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Listar todas las citas asignadas al médico (con filtro opcional de fecha)
export const getAppointments = async (req, res) => {
    const doctorId = req.user.id;
    const { date } = req.query;

    try {
        const whereClause = { doctor_id: doctorId };
        if (date) {
            whereClause.date = date;
        }

        const appointments = await MedicalAppointment.findAll({
            where: whereClause,
            include: [{ model: Patient }]
        });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Crear una nueva cita
export const createAppointment = async (req, res) => {
    const doctorId = req.user.id;
    const { patient_id, date, hour } = req.body;

    try {
        // Verificar si ya existe una cita en la misma fecha y hora para el médico o el paciente
        const existingAppointment = await MedicalAppointment.findOne({
            where: {
                [Op.or]: [
                    { doctor_id: doctorId, date, hour },
                    { patient_id, date, hour }
                ]
            }
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'An appointment already exists at this time' });
        }

        const appointment = await MedicalAppointment.create({ patient_id, doctor_id: doctorId, date, hour });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Editar una cita específica
export const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { patient_id, date, hour } = req.body;

    try {
        const appointment = await MedicalAppointment.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Verificar si ya existe una cita en la misma fecha y hora para el médico o el paciente
        const existingAppointment = await MedicalAppointment.findOne({
            where: {
                [Op.or]: [
                    { doctor_id: appointment.doctor_id, date, hour },
                    { patient_id, date, hour }
                ],
                id: { [Op.ne]: appointmentId }
            }
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'An appointment already exists at this time' });
        }

        appointment.date = date;
        appointment.hour = hour;
        appointment.patient_id = patient_id;
        await appointment.save();

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Eliminar una cita específica
export const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const appointment = await MedicalAppointment.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await appointment.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
