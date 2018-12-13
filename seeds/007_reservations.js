const {util, seed} = require('data-seed')
function userTripId(){ return util.random.int(1,10)}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('reservations').del()
    .then(() => {
      // Inserts seed entries
      return knex('reservations').insert([
        { userId: userTripId(), tripId: userTripId(), isPaid: true, isFavorite: false },
        { userId: userTripId(), tripId: userTripId(), isPaid: true, isFavorite: false },
        { userId: userTripId(), tripId: userTripId(), isPaid: true, isFavorite: false },
        { userId: userTripId(), tripId: userTripId(), isPaid: true, isFavorite: false },
        { userId: userTripId(), tripId: userTripId(), isPaid: true, isFavorite: true },
        { userId: userTripId(), tripId: userTripId(), isPaid: true, isFavorite: true },
        { userId: userTripId(), tripId: userTripId(), isPaid: false, isFavorite: true },
        { userId: userTripId(), tripId: userTripId(), isPaid: false, isFavorite: true },
        { userId: userTripId(), tripId: userTripId(), isPaid: false, isFavorite: false },
        { userId: userTripId(), tripId: userTripId(), isPaid: false, isFavorite: false }
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('reservations_id_seq', (SELECT MAX(id) FROM reservations))")
    })
}
