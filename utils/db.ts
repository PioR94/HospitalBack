import { createPool } from 'mysql2/promise';

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const pool = createPool({
  host: 'localhost',
  user,
  password,
  database,
  namedPlaceholders: true,
  decimalNumbers: true,
});
