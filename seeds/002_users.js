const {util, seed} = require('data-seed')
const firstNameSeed = () => { return seed.name.en.firstName() }
const lastNameSeed = () => { return seed.name.en.lastName() }
const seedEmail = () => { return seed.email() }

const generateUsersSeeds = (num) => {
  let users = [] 
  for (let i = 0; i < num; i++) {
      users.push(
        {firstName: firstNameSeed(), lastName: lastNameSeed(), email: seedEmail()}
      )
  }
  return users
}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(generateUsersSeeds(10))
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    })
}

//user types = {standard, staff, driver, admin, deactivated}
