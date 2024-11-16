import db from '../models/index.js';

class DoctorService {
  static async getDoctorAppointments(doctorId, date) {
    try {
      const query = date
        ? { where: { doctorId, date } }
        : { where: { doctorId } };
      const appointments = await db.MedicalAppointment.findAll(query);
      return appointments;
    } catch (error) {
      throw new Error('Error al obtener las citas del médico');
    }
  }

  static async createAppointment(appointmentData) {
    try {
      // Comprobar si ya existe una cita en esa fecha y hora
      const existingAppointment = await db.MedicalAppointment.findOne({
        where: {
          doctorId: appointmentData.doctorId,
          date: appointmentData.date,
          hour: appointmentData.hour,
        },
      });

      if (existingAppointment) {
        throw new Error('Ya existe una cita para esta fecha y hora');
      }

      const appointment = await db.MedicalAppointment.create(appointmentData);
      return appointment;
    } catch (error) {
      throw new Error('Error al crear la cita');
    }
  }

  static async updateAppointment(appointmentId, updatedData) {
    try {
      const appointment = await db.MedicalAppointment.findByPk(appointmentId);
      if (!appointment) {
        throw new Error('Cita no encontrada');
      }
      await appointment.update(updatedData);
      return appointment;
    } catch (error) {
      throw new Error('Error al actualizar la cita');
    }
  }

  static async deleteAppointment(appointmentId) {
    try {
      const appointment = await db.MedicalAppointment.findByPk(appointmentId);
      if (!appointment) {
        throw new Error('Cita no encontrada');
      }
      await appointment.destroy();
      return true;
    } catch (error) {
      throw new Error('Error al eliminar la cita');
    }
  }
}

export default DoctorService;
