import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import config from './config.json';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

export default sequelize;
