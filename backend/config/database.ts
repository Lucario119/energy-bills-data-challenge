import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

export default sequelize;
