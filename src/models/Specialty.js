import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Specialty = sequelize.define('Specialty', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Specialty;
