const {util, seed} = require('data-seed')
function seedName(){ return seed.name.en.firstName() }

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('buses').del()
    .then(() => {
      // Inserts seed entries
      return knex('buses').insert([
        {capacity: 44, name: seedName()},
        {capacity: 44, name: seedName()},
        {capacity: 44, name: seedName()},
        {capacity: 50, name: seedName()},
        {capacity: 50, name: seedName()},
        {capacity: 50, name: seedName()},
        {capacity: 50, name: seedName()},
        {capacity: 54, name: seedName()},
        {capacity: 54, name: seedName()},
        {capacity: 54, name: seedName()},
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('buses_id_seq', (SELECT MAX(id) FROM buses))")
    })
}
