import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Doctor from './Doctor.js';
import Patient from './Patient.js';

const MedicalAppointment = sequelize.define('MedicalAppointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: 'id'
        }
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Doctor,
            key: 'id'
        }
    }
});

MedicalAppointment.belongsTo(Patient, { foreignKey: 'patient_id' });
MedicalAppointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

export default MedicalAppointment;
