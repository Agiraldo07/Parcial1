-- Crear la tabla de especialidades
CREATE TABLE specialty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear la tabla de doctores
CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    specialty_id INTEGER REFERENCES specialty(id)
);

-- Crear la tabla de pacientes
CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Crear la tabla de citas médicas
CREATE TABLE medicalappointment (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    patient_id INTEGER REFERENCES patient(id),
    doctor_id INTEGER REFERENCES doctor(id),
    UNIQUE (date, hour, doctor_id),
    UNIQUE (date, hour, patient_id)
);
