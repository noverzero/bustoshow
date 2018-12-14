//NOTE: All model does is create objects and return them

const knex = require('../../knex.js')

const error = {
  error: 'message'
}

// PICKUP LOCATIONS

// Get All pickup locations
const getAllLocations = (eventId) => {
  knex('trips')
  .join('pickup_locations', 'pickup_locations.id', 'trips.pickupLocationId')
  .select('locationName', 'streetAddress')
  .join('events', 'events.id', 'trips.eventId')
  .select('venue', 'headliner')
  .where('events.id', eventId)
  .first()
  .then((data) => {
    if (!eventId) {
      return error
    }
    return data
    })
}


  // Get One pickup location -- this response displays with price and departure time on reservation page.

const getOneLocation = (locationId, eventId) => {
  knex('trips')
  .join('pickup_locations', 'pickup_locations.id', 'trips.pickupLocationId')
  .select('locationName', 'streetAddress')
  .where('pickupLocations.id', locationId)
  .first()
  .join('events', 'events.id', 'trips.eventId')
  .select('venue', 'headliner')
  .where('events.id', eventId)
  .first()
  .then((data) => {
    if (!locationId || !eventId) {
      return error
    }
    return data
    })
  }


  // Post add new location (superadmin or, eventually, seeder )
  // use req.body
  const addNewLocation = (body) => {
    let streetAddress = body.streetAddress
    let locationName = body.locationName
  knex('pickup_locations')
  .insert(body)
  .returning(['locationName', 'streetAddress'])
  .then((data) => {
  if (!streetAddress || !locationName) {
    return error
  }
    return data[0]
    })
}

  // Patch - update location details (superadmin)
const updateLocation = (id, body) => {
  let streetAddress = body.streetAddress
  let locationName = body.locationName
knex('pickup_locations')
  .where('id', id)
  .update(body)
  .returning(['locationName', 'streetAddress'])
  .then((data) => {
    if (!streetAddress || !locationName) {
      return error
    }
      return data[0]
  })
}

  // Delete one pickup location (superadmin)
const deleteLocation = (id) => {
knex('pickup_locations')
  .where('id', id)
  .del('*')
  .returning(['locationName', 'streetAddress'])
  .then((data) => {
    if (!id) {
      return error
    }
    return data
    })
  }


module.exports = {
  deleteLocation,
  updateLocation,
  addNewLocation,
  getOneLocation,
  getAllLocations
}
