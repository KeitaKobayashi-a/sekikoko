const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.seed = async function (knex) {
  const hash = await bcrypt.hash('1234', saltRounds);
  const entries = [];
  for (let i = 1; i <= 10; i++) {
    entries.push({ id: i, username: `user${i}`, password: hash });
  }
  await knex('users').del();
  await knex('users').insert(entries);
};
