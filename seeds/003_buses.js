const {util, seed} = require('data-seed')
const seedName = () => { return seed.name.en.firstName() }
const busCapacity = () => { return util.random.int(1,7) }

const generateBusSeeds = (num) => {
  let buses = [] 
  for (let i = 0; i < num; i++) {
      buses.push(
        {capacity: busCapacity(), name: seedName()}
      )
  }
  return buses
}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('buses').del()
    .then(() => {
      // Inserts seed entries
      return knex('buses').insert(generateBusSeeds(14))
    })
    .then(() => {
      return knex.raw("SELECT setval('buses_id_seq', (SELECT MAX(id) FROM buses))")
    })
}
