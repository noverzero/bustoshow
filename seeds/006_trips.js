const {util, seed} = require('data-seed')
function busEventDriverId(){ return util.random.int(1,10)}
function locId(){ return util.random.int(1,7) }
function depart(){  return seed.time([hourType=24]) }

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(() => {
      // Inserts seed entries
      return knex('trips').insert([
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() },
        { busId: busEventDriverId(), eventId: busEventDriverId(), pickupLocationId: locId(), driverId: busEventDriverId(), departureTime: depart() }
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips))")
    })
}
