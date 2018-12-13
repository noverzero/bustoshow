exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users_events').del()
    .then(() => {
      // Inserts seed entries
      return knex('users_events').insert()
    })
    .then(() => {
      return knex.raw("SELECT setval('users_events_id_seq', (SELECT MAX(id) FROM users_events))")
    })
}
