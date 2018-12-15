const knex = require('../../knex.js')
// PICKUP LOCATIONS

// Get All pickup locations
const getAllLocations = (eventId) => {
  if (!eventId) {
    return {error:"bad event id"}
  }
  return knex("pickup_locations")
  .select("streetAddress","locationName")
  .innerJoin("trips","trips.pickupLocationId","pickup_locations.id")
  .select("departureTime")
  .where("trips.eventId",eventId)
  .innerJoin("events","trips.eventId","events.id")
  .select("headliner","venue","startTime")
  .then((data) => data)
}


// Get One pickup location -- this response displays with price and departure time on reservation page.

const getOneLocation = (locationId, eventId) => {
  if (!eventId || !locationId) {
    return {error:"bad id"}
  }
  return knex("pickup_locations")
  .select("streetAddress","locationName")
  .where("pickup_locations.id",locationId)
  .innerJoin("trips","trips.pickupLocationId","pickup_locations.id")
  .select("departureTime")
  .where("trips.eventId",eventId)
  .innerJoin("events","trips.eventId","events.id")
  .select("headliner","venue","startTime")
  .first()
  .then(data => data)
}


  // Post add new location (superadmin or, eventually, seeder )
  // use req.body
const addNewLocation = (body) => {
  const {streetAddress,locationName} = body
  if (!streetAddress || !locationName) {
    return {error:"fields required"}
  }
  return knex('pickup_locations')
  .insert({streetAddress,locationName})
  .returning("*")
  .then(data => data[0])
}

  // Patch - update location details (superadmin)
const updateLocation = (id, body) => {
  let streetAddress = body.streetAddress
  let locationName = body.locationName
  if (!streetAddress || !locationName) {
    return {error: "fill out fields"}
  }
  return knex('pickup_locations')
  .where('id', id)
  .update(body)
  .returning(['locationName', 'streetAddress'])
  .then((data) => data[0])
}

  // Delete one pickup location (superadmin)
const deleteLocation = (id) => {
  if (!id) {
    return {error:"can't delete that id"}
  }
  return knex('pickup_locations')
  .where('id', id)
  .del('*')
  .returning(['locationName', 'streetAddress'])
  .then(data => data)
}


module.exports = {
  deleteLocation,
  updateLocation,
  addNewLocation,
  getOneLocation,
  getAllLocations
}
