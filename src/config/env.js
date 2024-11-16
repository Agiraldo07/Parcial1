import dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
