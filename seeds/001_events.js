const muhArr = require("../eventAxiosCall.js")

exports.seed = (knex) => {
  return knex('events').del()
  .then(() => {
    return muhArr.PLEASE().then((data)=>{
      return knex('events').insert(data)
    })
  })
  .then(() => {
    return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
  })
}
