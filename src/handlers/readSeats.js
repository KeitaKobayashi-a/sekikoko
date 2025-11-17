module.exports = async (knex) => {
    const data = await knex.select().table('seats');
    return data
}