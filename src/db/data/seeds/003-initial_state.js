exports.seed = async function (knex) {
  const entries = (() => {
    const result = [];
    for (let index = 1; index <= 16; index++) {
      result.push({
        loc: index,
        is_seated: false,
      });
    }
    return result;
  })();

  await knex('seats').del();
  await knex('seats').insert(entries);
};
