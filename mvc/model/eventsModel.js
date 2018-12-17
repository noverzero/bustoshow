const knex = require('../../knex.js')
const error = { error: 'message' }

// POST /events        user/admin create a new Event
const createNewEvent = (eventInfo) => {
  let venue = eventInfo.venue
  let headliner = eventInfo.headliner
  let date = eventInfo.date
  let startTime = eventInfo.startTime

  if (!venue || !headliner || !date || !startTime) {
    return error
  }
  return knex('events')
  .insert(eventInfo)
  .returning(['venue', 'headliner', 'date', 'startTime'])
  .then((data) => {
    return data[0]
  })
}

// GET /events         Retrieve all Events
const getAllEvents = () => {
  return knex('events')
  .select(["id",'venue', 'headliner', 'date', 'startTime'])
  .orderBy('date', 'asc')
  .then((events) => {
    return events
  })
}

// GET /events/:id			Retrieve single Event
const getOneEvent = (id) => {
  if (!id) {
    return error
  }
  return knex('events')
  .select(['venue', 'headliner', 'date', 'startTime'])
  .where('id', id)
  .first()
  .then((event) => {
    return event
  })
}

// PATCH /events/:id 	Update a single Event
const updateOneEvent = (id, eventInfo) => {
  const {venue,headliner,date,startTime} = eventInfo
  if (!venue || !headliner || !date || !startTime) {
    return error
  }
  if (!id || typeof id === 'number') {
    return error
  }
  return knex('events')
  .where('events.id', id)
  .update({venue,headliner,date,startTime})
  .returning(["id","venue","headliner","date","startTime"])
  .then((event) => {
    return event[0]
  })
}

// DELETE /events/:id 	Delete an Event
const deleteEvent = (id) => {
  if(!id) {
    return error
  }
  return knex('events')
  .where('id', id)
  .del('*')
  .returning(["venue","headliner","date","startTime"])
  .then((deleted) => {
    return deleted
  })
}

// GET /events/:query 	Retrieve Events by search **stretch goal


module.exports = {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateOneEvent
}
