module.exports = async (knex, userId) => {
  await knex('seats')
    .where('userId', userId)
    .update({ is_seated: false, loc: null });
  const data = await knex.select().table('seats');
  return data;
};
