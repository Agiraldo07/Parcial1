import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Specialty from './Specialty.js';

const Doctor = sequelize.define('Doctor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Specialty,
            key: 'id'
        }
    }
});

Doctor.belongsTo(Specialty, { foreignKey: 'specialty_id' });

export default Doctor;
