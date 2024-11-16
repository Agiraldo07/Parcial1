import express from 'express';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import sequelize from './config/database.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);

sequelize.sync().then(() => {
    console.log('Database connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
