import dotenv from 'dotenv';
dotenv.config();
import S from 'sequelize';
const db_name = process.env.DB_NAME;
const db_host = process.env.HOST;

const db = new S(db_name, null, null, {
  host: db_host,
  dialect: `postgres`,
  logging: false,
});

export default db;
