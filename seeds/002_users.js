const {util, seed} = require('data-seed')
function firstNameSeed(){ return seed.name.en.firstName() }
function lastNameSeed(){ return seed.name.en.lastName() }
function seedEmail(){ return seed.email() }

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()},
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()}
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    })
}
