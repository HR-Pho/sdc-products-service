// move the login data into a separate, hidden file for production

const { Pool } = require('pg');
const pool = new Pool({
  user: 'kylenissley',
  host: 'localhost',
  database: 'products',
  password: 'password',
  port: 5432,
});



module.exports = {pool};