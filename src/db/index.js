const knex = require('knex');
const { development, production } = require('./knexfile.js');

const env = process.env.NODE_ENV || 'development';
const knexConfig = env === 'production' ? production : development;

module.exports = knex(knexConfig);
