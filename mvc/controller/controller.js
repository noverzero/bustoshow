const model = require("../model/pickupsModel.js")
//users
// const getUser = (req,res,next) => {
//   let user = model.
//   return user.error ? next({status:404,message:"Not found"}) : res.status(200).send(user)
// }

// const createUser = (req,res,next) => {
//   let createU = model.
//   return createU.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createU)
// }

// const updateUser = (req,res,next) => {
//   let updateU = model.
//   return updateU.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateU)
// }

// //token
// const getToken = (req,res,next) => {
//   let getT = model.
//   return getT.error ? next({status:404,message:"Not found"}) : res.status(200).send(getT)
// }

// const signIn = (req,res,next) => {
//   let sI = model.
//   return sI.error ? next({status:404,message:"Failed to Sign In"}) : res.status(201).send(sI)
// }

// const logOut = (req,res,next) => {
//   let lo = model.
//   return lo.error ? next({status:404,message:"Failed to Log Out"}) : res.status(204).send(lo)
// }

//events
const createEvents = (req,res,next) => {
  return model.createNewEvent(req.body).then((createEvent) => {
  return createEvent.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createEvent)
  })
}

const getAllEvents = (req,res,next) => {
  return model.getAllEvents().then((getAllE) => {
  return getAllE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllE)
  })
}

const getOneEvent = (req,res,next) => {
  return model.getOneEvent(req.params.id).then((getOneE) => {
  return getOneE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneE)
  })
}

// const eventQuery = (req,res,next) => {
//   let eventQ = model.
//   return eventQ.error ? next({status:404,message:"Not found"}) : res.status(200).send(eventQ)
// }

const updateEvent = (req,res,next) => {
  return model.updateEvent(req.params.id, req.body).then((updateE) => {
  return updateE.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateE)
  })
}

const deleteEvent = (req,res,next) => {
  return model.deleteEvent(req.params.id).then((deleteE) => {
  return deleteE.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteE)
  })
}

//Pickup_locations
const getAllPickupLocations = (req,res,next) => {
  let getAllP = model.getAllLocations()
  return getAllP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllP)
}

const getOnePickupLocation = (req,res,next) => {
  let getOneP = model.getOneLocation(req.params.pid,req.params.id)
  return getOneP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneP)
}

const createPickupLocation = (req,res,next) => {
  let createP = model.addNewLocation(req.params.id,req.body)
  return createP.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createP)
}

const updatePickupLocation= (req,res,next) => {
  let updateP = model.updateLocation(req.params.id,req.body)
  return updateP.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateP)
}

const deletePickupLocation = (req,res,next) => {
  let deleteP = model.deleteLocation(req.params.id)
  return deleteP.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteP)
}

//bueses
// const getAllBuses = (req,res,next) => {
//   let getAllB = model.
//   return getAllB.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllB)
// }

// const getOneBus = (req,res,next) => {
//   let getOneB = model.
//   return getOneB.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneB)
// }

// const createBus = (req,res,next) => {
//   let createB = model.
//   return createB.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createB)
// }

// const updateBus = (req,res,next) => {
//   let updateB = model.
//   return updateB.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateB)
// }

// const deleteBus = (req,res,next) => {
//   let deleteB = model.
//   return deleteB.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteB)
// }

module.exports = { getUser, 
  createUser, 
  updateUser, 
  getToken, 
  signIn, 
  logOut,
  createEvents, 
  getAllEvents, 
  getOneEvent, 
  eventQuery, 
  updateEvent, 
  deleteEvent,
  getAllPickupLocations, 
  getOnePickupLocation, 
  createPickupLocation, 
  updatePickupLocation,
  deletePickupLocation, 
  getAllBuses, 
  getOneBus, 
  createBus, 
  updateBus, 
  deleteBus }
