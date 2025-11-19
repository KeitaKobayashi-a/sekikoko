module.exports = async (knex, username) => {
  const target = await knex
    .select('loc')
    .table('seats')
    .where('username', username);
  await knex('seats')
    .where('username', username)
    .update({ is_seated: false, ticket_number: null });
  const data = {
    data: await knex.select().table('seats'),
    target,
  };
  return data;
};
