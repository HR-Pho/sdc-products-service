const { Pool } = require('pg');

const poolOptions = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnAuthorized: false,
  },
} : {
  user: 'kylenissley',
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: '5432',
  database: 'products',
};

const pool = new Pool(poolOptions);

pool.connect()
  .then(() => console.log('Database running.'))
  .catch(() => console.log('Error connecting to database.'));

exports.products = pool;