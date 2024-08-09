const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const plainTextPw = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  await knex('users').insert([
    {first_name: 'Ben', last_name: 'Sullins', username: 'bsullins', password: await plainTextPw('password')},
    {first_name: 'Josh', last_name: 'Smith', username: 'jsmith', password: await plainTextPw('password')},
    {first_name: 'Aaron', last_name: 'Jones', username: 'ajones', password: await plainTextPw('password')}
  ]);
};