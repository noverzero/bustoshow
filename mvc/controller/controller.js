const model = require("../model/pickupsModel.js")
//users
const getUser = (req,res,next) => {
  // let user = model.
  // return user.error ? next({status:404,message:"Not found"}) : res.status(200).send(user)
}
const createUser = (req,res,next) => {
  // let createU = model.
  // return createU.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createU)
}
const updateUser = (req,res,next) => {
  // let updateU = model.
  // return updateU.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateU)
}
//token
const getToken = (req,res,next) => {
  // let getT = model.
  // return getT.error ? next({status:404,message:"Not found"}) : res.status(200).send(getT)
}
const signIn = (req,res,next) => {
  // let sI = model.
  // return sI.error ? next({status:404,message:"Failed to Sign In"}) : res.status(201).send(sI)
}
const logOut = (req,res,next) => {
  // let lo = model.
  // return lo.error ? next({status:404,message:"Failed to Log Out"}) : res.status(204).send(lo)
}
//events
const createEvents = (req,res,next) => {
  // let createE = model.
  // return createE.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createE)
}
const getAllEvents = (req,res,next) => {
  // let getAllE = model.
  // return getAllE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllE)
}
const getOneEvent = (req,res,next) => {
  // let getOneE = model.
  // return getOneE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneE)
}
const eventQuery = (req,res,next) => {
  // let eventQ = model.
  // return eventQ.error ? next({status:404,message:"Not found"}) : res.status(200).send(eventQ)
}
const updateEvent = (req,res,next) => {
  // let updateE = model.
  // return updateE.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateE)
}
const deleteEvent = (req,res,next) => {
  // let deleteE = model.
  // return deleteE.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteE)
}
//Pickup_locations
const getAllPickupLocations = (req,res,next) => {
  return model.getAllLocations(req.params.id).then((getAllP)=>{
    return getAllP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllP)
  })
}
const getOnePickupLocation = (req,res,next) => {
  return model.getOneLocation(req.params.pid,req.params.id).then((getOneP)=>{
    return getOneP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneP)
  })
}
const createPickupLocation = (req,res,next) => {
  return model.addNewLocation(req.body).then((createP)=>{
    return createP.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createP)
  })
}
const updatePickupLocation= (req,res,next) => {
  return model.updateLocation(req.params.id,req.body).then((updateP)=>{
    return updateP.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateP)
  })
}
const deletePickupLocation = (req,res,next) => {
  return model.deleteLocation(req.params.id).then((deleteP)=>{
    return deleteP.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteP)
  })
}
//bueses
const getAllBuses = (req,res,next) => {
  // let getAllB = model.
  // return getAllB.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllB)
}
const getOneBus = (req,res,next) => {
  // let getOneB = model.
  // return getOneB.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneB)
}
const createBus = (req,res,next) => {
  // let createB = model.
  // return createB.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createB)
}
const updateBus = (req,res,next) => {
  // let updateB = model.
  // return updateB.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateB)
}
const deleteBus = (req,res,next) => {
  // let deleteB = model.
  // return deleteB.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteB)
}
module.exports = {
  getUser,
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
  deleteBus
}
