import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'megak_hospital',
  namedPlaceholders: true,
  decimalNumbers: true,
});
