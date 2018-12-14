const model = require("../model/model.js")
//users
const getUser = (req,res,next) => {
  let user = model.
  return user.error ? next({status:404,message:"Not found"}) : res.status(200).send(user)
}.catch((err)=>next(err))
const createUser = (req,res,next) => {
  let createU = model.
  return createU.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createU)
}.catch((err)=>next(err))
const updateUser = (req,res,next) => {
  let updateU = model.
  return updateU.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateU)
}.catch((err)=>next(err))
//token
const getToken = (req,res,next) => {
  let getT = model.
  return getT.error ? next({status:404,message:"Not found"}) : res.status(200).send(getT)
}.catch((err)=>next(err))
const signIn = (req,res,next) => {
  let sI = model.
  return sI.error ? next({status:404,message:"Failed to Sign In"}) : res.status(201).send(sI)
}.catch((err)=>next(err))
const logOut = (req,res,next) => {
  let lo = model.
  return lo.error ? next({status:404,message:"Failed to Log Out"}) : res.status(204).send(lo)
}.catch((err)=>next(err))
//events
const createEvents = (req,res,next) => {
  let createE = model.
  return createE.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createE)
}.catch((err)=>next(err))
const getAllEvents = (req,res,next) => {
  let getAllE = model.
  return getAllE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllE)
}.catch((err)=>next(err))
const getOneEvent = (req,res,next) => {
  let getOneE = model.
  return getOneE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneE)
}.catch((err)=>next(err))
const eventQuery = (req,res,next) => {
  let eventQ = model.
  return eventQ.error ? next({status:404,message:"Not found"}) : res.status(200).send(eventQ)
}.catch((err)=>next(err))
const updateEvent = (req,res,next) => {
  let updateE = model.
  return updateE.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateE)
}.catch((err)=>next(err))
const deleteEvent = (req,res,next) => {
  let deleteE = model.
  return deleteE.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteE)
}.catch((err)=>next(err))
//Pickup_locations
const getAllPickupLocations = (req,res,next) => {
  let getAllP = model.getAllLocations()
  return getAllP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllP)
}.catch((err)=>next(err))
const getOnePickupLocation = (req,res,next) => {
  let getOneP = model.getOneLocation(req.params.pid,req.params.id)
  return getOneP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneP)
}.catch((err)=>next(err))
const createPickupLocation = (req,res,next) => {
  let createP = model.addNewLocation(req.params.id,req.body)
  return createP.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createP)
}.catch((err)=>next(err))
const updatePickupLocation= (req,res,next) => {
  let updateP = model.updateLocation(req.params.id,req.body)
  return updateP.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateP)
}.catch((err)=>next(err))
const deletePickupLocation = (req,res,next) => {
  let deleteP = model.deleteLocation(req.params.id)
  return deleteP.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteP)
}.catch((err)=>next(err))
//bueses
const getAllBuses = (req,res,next) => {
  let getAllB = model.
  return getAllB.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllB)
}.catch((err)=>next(err))
const getOneBus = (req,res,next) => {
  let getOneB = model.
  return getOneB.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneB)
}.catch((err)=>next(err))
const createBus = (req,res,next) => {
  let createB = model.
  return createB.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createB)
}.catch((err)=>next(err))
const updateBus = (req,res,next) => {
  let updateB = model.
  return updateB.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateB)
}.catch((err)=>next(err))
const deleteBus = (req,res,next) => {
  let deleteB = model.
  return deleteB.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteB)
}.catch((err)=>next(err))
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
