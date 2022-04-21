// move this data into a separate, hidden file for production

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'kylenissley',
  host: 'localhost',
  database: 'products',
  password: 'password',
  port: 5432,
});
