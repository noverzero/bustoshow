const knex = require('../../knex.js')
const error = { error: 'message' }

// POST /events        user/admin create a new Event
const createNewEvent = (eventInfo) => {
  let venue = eventInfo.venue
  let headliner = eventInfo.headliner
  let date = eventInfo.date
  let startTime = eventInfo.startTime
  
  return knex('events')
  .insert(eventInfo)
  .returning(['venue', 'headliner', 'date', 'startTime'])
  .then((data) => {
    if (!venue || !headliner || !date || !startTime) {
      return error      
    }
    return data[0]
  })
}

// GET /events         Retrieve all Events
const getAllEvents = () => {
  return knex('events')
  .select(['venue', 'headliner', 'date', 'startTime'])
  .orderBy('date', 'asc')
  .then((events) => {
    return events
  })
}

// GET /events/:id			Retrieve single Event
const getOneEvent = (id) => {
  return knex('events')
  .select(['venue', 'headliner', 'date', 'startTime'])
  .where('id', id)
  .first()
  .then((event) => {
    if (!id) {
      return error
    }
    return event
  })
}

// PATCH /events/:id 	Update a single Event
const updateEvent = (id, eventInfo) => {
  let venue = eventInfo.venue
  let headliner = eventInfo.headliner
  let date = eventInfo.date
  let startTime = eventInfo.startTime

  return knex('events')
  .where('id', id)
  .update(eventInfo)
  .returning(['venue', 'headliner', 'date', 'startTime'])
  .first()
  .then((event) => {
    if (!id) {
      return error
    }
    return event
  })
}

// DELETE /events/:id 	Delete an Event
const deleteEvent = (id) => {
  return knex('events')
  .where('id', id)
  .del()
  .returning('*')
  .first()
  .then((deleted) => {
    if(!id) {
      return error
    }
    return deleted
  })
}

// GET /events/:query 	Retrieve Events by search **stretch goal


module.exports = {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateEvent
}