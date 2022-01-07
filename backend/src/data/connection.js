import config from '../config';
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: config.pg.PGUSER,
  host: config.pg.PGHOST,
  database: config.pg.PGDATABASE,
  password: config.pg.PGPASSWORD,
  port: config.pg.PGPORT,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

export const db = {
  query(query, values) {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ results, fields });
      });
    });
  },
};
