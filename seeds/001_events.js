const {util, seed} = require('data-seed')
function seedVenue(){ return seed.word(6, 12) }
function seedHeadliner(){ return seed.word(4, 20) }
function seedDate(){ return seed.date.format("MM-DD-YYYY") }
function seedStartTime(){ return seed.time([hourType=24]) }

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(() => {
      // Inserts seed entries
      return knex('events').insert([
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()},
        {venue: seedVenue(), headliner: seedHeadliner(), date: seedDate(), startTime: seedStartTime()}
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))")
    })
}
