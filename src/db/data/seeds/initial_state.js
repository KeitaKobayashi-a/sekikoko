exports.seed = async function (knex) {
  const entries = (() => {
    const result = [];
    for (let index = 1; index < 17; index++) {
      result.push({
        userId: index + 100,
        loc: index,
        is_seated: false,
      });
    }
    return result;
  })();

  await knex('seats').del();
  await knex('seats').insert(entries);
};
