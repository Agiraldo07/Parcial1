-- Insertar especialidades
INSERT INTO specialty (name) VALUES
('Medicina General'),
('Cardiología'),
('Urología'),
('Fisiología'),
('Pediatría');

-- Insertar médicos
INSERT INTO doctor (name, age, email, password, specialty_id) VALUES
('Geraldine Giraldo', 38, 'geraldine.giraldo@example.com', 'hashed_password_16', 1),
('Anderson Giraldo', 40, 'anderson.giraldo@example.com', 'hashed_password_17', 2),
('Thor Arboleda', 42, 'thor.arboleda@example.com', 'hashed_password_18', 3),
('Melki Giraldo', 36, 'melki.giraldo@example.com', 'hashed_password_19', 4),
('Yanet Arboleda', 30, 'yanet.arboleda@example.com', 'hashed_password_20', 5);

-- Insertar pacientes
INSERT INTO patient (name, age, email, password) VALUES
('Carlos Sánchez', 32, 'carlos.sanchez@example.com', 'hashed_password_16'),
('Valeria Gómez', 24, 'valeria.gomez@example.com', 'hashed_password_17'),
('Ricardo Díaz', 28, 'ricardo.diaz@example.com', 'hashed_password_18'),
('Fernanda Castro', 26, 'fernanda.castro@example.com', 'hashed_password_19'),
('Eduardo Martínez', 41, 'eduardo.martinez@example.com', 'hashed_password_20'),
('Isabel Mendoza', 35, 'isabel.mendoza@example.com', 'hashed_password_21'),
('Julian Vargas', 39, 'julian.vargas@example.com', 'hashed_password_22'),
('Paula Pérez', 29, 'paula.perez@example.com', 'hashed_password_23'),
('David Ruiz', 33, 'david.ruiz@example.com', 'hashed_password_24'),
('Claudia López', 27, 'claudia.lopez@example.com', 'hashed_password_25');