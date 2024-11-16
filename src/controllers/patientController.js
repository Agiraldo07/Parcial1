import MedicalAppointment from '../models/MedicalAppointment.js';
import Patient from '../models/Patient.js';

export const getPatientAppointments = async (req, res) => {
    const { patientId } = req.params;

    try {
        const appointments = await MedicalAppointment.findAll({
            where: { patient_id: patientId },
            include: [{ model: Patient }]
        });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
