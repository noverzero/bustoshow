
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('pickup_locations').del()
    .then(() => {
      // Inserts seed entries
      return knex('pickup_locations').insert([
        { streetAddress: '', locationName: ''},
        { streetAddress: '', locationName: ''},
        { streetAddress: '', locationName: ''},
        { streetAddress: '', locationName: ''},
        { streetAddress: '', locationName: ''},
        { streetAddress: '', locationName: ''},
        { streetAddress: '', locationName: ''},
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('pickup_locations_id_seq', (SELECT MAX(id) FROM pickup_locations))")
    })
}
