const knex = require('../../knex.js')
// PICKUP LOCATIONS

// Get All pickup locations
const getAllLocations = (eventId) => {
  if (!eventId) {
    return {error:"bad event id"}
  }
  return knex("pickup_locations")
  .select("streetAddress","locationName","price")
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
  .select("streetAddress","locationName","price")
  .where("pickup_locations.id",locationId)
  .innerJoin("trips","trips.pickupLocationId","pickup_locations.id")
  .select("departureTime")
  .where("trips.eventId",eventId)
  .innerJoin("events","trips.eventId","events.id")
  .select("headliner","venue","startTime")
  .first()
  .then(data => data)
}

const pul1 = () => {
  return knex("pickup_locations")
  .select("streetAddress","locationName","price")
  .innerJoin("trips","trips.pickupLocationId","pickup_locations.id")
  .select("departureTime")
  .innerJoin("events","trips.eventId","events.id")
  .select("headliner","venue","startTime","events.id","date")
  .then((data) => data)
}
const pul2 = (id) => {
  if (!id) {
    return {error:"bad id"}
  }
  return knex("pickup_locations")
  .select("streetAddress","locationName","price")
  .where("pickup_locations.id",id)
  .innerJoin("trips","trips.pickupLocationId","pickup_locations.id")
  .select("departureTime")
  .innerJoin("events","trips.eventId","events.id")
  .select("headliner","venue","startTime")
  .then(data => data)
}//I dont know why i thought this needed to exist but it does

  // Post add new location (superadmin or, eventually, seeder )
  // use req.body
const addNewLocation = (body) => {
  const {streetAddress,locationName, price} = body
  if (!streetAddress || !locationName || !price) {
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
  if (!streetAddress || !locationName || !price) {
    return {error: "fill out fields"}
  }
  return knex('pickup_locations')
  .where('id', id)
  .update(body)
  .returning(['locationName', 'streetAddress',"price"])
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
  .returning("*")
  .then(data => data)
}


module.exports = {
  deleteLocation,
  updateLocation,
  addNewLocation,
  getOneLocation,
  getAllLocations,
  pul1,
  pul2
}
