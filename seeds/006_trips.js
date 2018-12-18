const {util, seed} = require('data-seed')
const busEventDriverId = () => { return util.random.int(1,10)}
const eventIdd = () => { return util.random.int(1,21)}
const locId = () => { return util.random.int(1,7) }
const depart = () => {  return seed.time([hourType=24]) }

const generateTripSeeds = (num) => {
  let trips = []
  for (let i = 0; i < num; i++) {
      trips.push(
        { busId: busEventDriverId(), eventId: eventIdd(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() }
      )
  }
  return trips
}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(() => {
      // Inserts seed entries
      return knex('trips').insert(generateTripSeeds(10))
    })
    .then(() => {
      return knex.raw("SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips))")
    })
}
