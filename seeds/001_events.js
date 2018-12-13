
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_nameTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
    })
}
