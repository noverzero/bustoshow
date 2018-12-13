exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users_events').del()
    .then(() => {
      // Inserts seed entries
      return knex('users_events').insert([
        { userId: 1, eventId: 2, isPaid: true },
        { userId: 2, eventId: 4, isPaid: true },
        { userId: 3, eventId: 6, isPaid: true },
        { userId: 3, eventId: 8, isPaid: true },
        { userId: 4, eventId: 8, isPaid: true },
        { userId: 5, eventId: 10, isPaid: true },
        { userId: 6, eventId: 1, isPaid: true },
        { userId: 6, eventId: 10, isPaid: false, isFavorite: true },
        { userId: 7, eventId: 3, isPaid: true },
        { userId: 8, eventId: 5, isPaid: true },
        { userId: 8, eventId: 1, isPaid: false, isFavorite: true },
        { userId: 8, eventId: 6, isPaid: true },
        { userId: 9, eventId: 7, isPaid: true },
        { userId: 10, eventId: 9, isPaid: true }
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('users_events_id_seq', (SELECT MAX(id) FROM users_events))")
    })
}
