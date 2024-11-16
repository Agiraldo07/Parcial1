import db from '../models/index.js';

class PatientService {
  static async getPatientById(patientId) {
    try {
      const patient = await db.Patient.findByPk(patientId);
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
      return patient;
    } catch (error) {
      throw new Error('Error al obtener los datos del paciente');
    }
  }

  static async getPatientAppointments(patientId) {
    try {
      const appointments = await db.MedicalAppointment.findAll({
        where: { patientId },
      });
      return appointments;
    } catch (error) {
      throw new Error('Error al obtener las citas del paciente');
    }
  }
}

export default PatientService;
