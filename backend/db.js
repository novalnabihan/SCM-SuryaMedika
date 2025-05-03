const { Pool } = require('pg');

const pool = new Pool({
  user: 'nopaal',
  host: 'localhost',
  database: 'gudang_hartindosuryamedika',
  password: 'nopaaladmin321',     
  port: 5432,
});

module.exports = pool;
