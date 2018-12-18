const knex = require("../../knex.js")
const getAllR = () => {
  return knex("events").select("date","headliner","startTime")
  .innerJoin("trips","events.id","trips.eventId").select("*")
  .innerJoin("reservations","reservations.tripId","trips.id").select("*")
}
const getOneR = () => {

}
const createR = () => {

}
const updateR = () => {

}
const deleteR = () => {

}
module.exports = {
  getAllR,
  getOneR,
  createR,
  updateR,
  deleteR
}
