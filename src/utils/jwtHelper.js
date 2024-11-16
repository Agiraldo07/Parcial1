import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: 'doctor', // Aquí puedes ajustar según sea necesario
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

export default generateToken;
