module.exports = async (knex, ticketNumber) => {
  const target = await knex('seats')
    .where('is_seated', false)
    .orderBy('loc')
    .first();
  await knex('seats')
    .where('id', target.id)
    .update({ ticket_number: ticketNumber, is_seated: true });

  const data = await knex.select().table('seats');
  return data;
};
