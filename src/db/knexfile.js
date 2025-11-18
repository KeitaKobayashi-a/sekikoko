require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
