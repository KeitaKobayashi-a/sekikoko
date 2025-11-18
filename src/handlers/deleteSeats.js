module.exports = async (knex, ticketNumber) => {
  const target = await knex
    .select('loc')
    .table('seats')
    .where('ticket_number', ticketNumber);
  await knex('seats')
    .where('ticket_number', ticketNumber)
    .update({ is_seated: false, ticket_number: null });
  const data = {
    data: await knex.select().table('seats'),
    ticketNumber,
    target,
  };
  return data;
};
