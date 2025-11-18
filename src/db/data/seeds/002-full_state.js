exports.seed = async function (knex) {
  const entries = (() => {
    const result = [];
    for (let index = 1; index <= 16; index++) {
      result.push({
        loc: index,
        ticket_number: index + 50,
        is_seated: true,
      });
    }
    return result;
  })();

  await knex('seats').del();
  await knex('seats').insert(entries);
};
