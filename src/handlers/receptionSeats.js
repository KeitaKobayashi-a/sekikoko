module.exports = async (knex, ticketNumber, username) => {
  const target = await knex('seats')
    .where('is_seated', false)
    .orderBy('loc')
    .first();
  await knex('seats').where('id', target.id).update({
    ticket_number: ticketNumber,
    is_seated: true,
    username: username,
  });

  const returns = { data: await knex.select().table('seats'), target };
  return returns;
};
