module.exports = async (knex, ticketNumber) => {
  await knex('seats')
    .where('ticket_number', ticketNumber)
    .update({ is_seated: false, ticket_number: null });
  const data = await knex.select().table('seats');
  return data;
};
