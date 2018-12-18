const pickupsModel = require("../model/pickupsModel.js")
const eventsModel = require("../model/eventsModel.js")
const busesModel = require("../model/busesModel.js")
const tokenModel = require("../model/tokenModel.js")
const usersModel = require("../model/usersModel.js")
const reservationsModel = require("../model/reservationsModel")

//users
const getUser = (req,res,next) => {
//   let user = model.
//   return user.error ? next({status:404,message:"Not found"}) : res.status(200).send(user)
}

const createUser = (req,res,next) => {
  return usersModel.addNewUser(req.body).then((userCreated) => {

    // const token = jwt.sign(currentUser, loginKey, { expiresIn: '30d' })
    // res.cookie('token', token, { httpOnly: true })
    return userCreated.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(userCreated)
  })
}

const updateUser = (req,res,next) => {
  return usersModel.editUserInfo(req.params.id, req.body).then((updatedUserInfo) => {
    return updatedUserInfo.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updatedUserInfo)
  })
}

const userPickupCheckinList = (req, res, next) => {
  return usersModel.getUserPickupCheckInList(req.params.eventId, req.params.pickupId).then((userCheckinList) => {
    return userCheckinList.error ? next({status:400,message:"Failed to List"}) : res.status(200).send(userCheckinList)
  })
}



//token
const getToken = (req,res,next) => {
  return res.send(tokenModel.checkToken(req.cookies.token))
}

const signIn = (req,res,next) => {
  return tokenModel.logInUser(req.body).then((loginValidate) => {
    console.log("loginValidate.error:",loginValidate.error)
    if (loginValidate.error) {
      next({
        status:400,message:"Invalid username or password"
      })
    } else {
      console.log(loginValidate)
      res.cookie('token', loginValidate, { httpOnly: true })
      .redirect('/')
    }
  })
}

const logOut = (req,res,next) => {
  res.clearCookie('token')
  res.end()
}

//events
const createEvents = (req,res,next) => {
  return eventsModel.createNewEvent(req.body).then((createEvent) => {
    return createEvent.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createEvent)
  })
}

const getAllEvents = (req,res,next) => {
  return eventsModel.getAllEvents().then((getAllE) => {
    return getAllE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllE)
  })
}

const getOneEvent = (req,res,next) => {
  return eventsModel.getOneEvent(req.params.id).then((getOneE) => {
    return getOneE.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneE)
  })
}

const eventQuery = (req,res,next) => {
//   let eventQ = model.
//   return eventQ.error ? next({status:404,message:"Not found"}) : res.status(200).send(eventQ)
}

const updateEvent = (req,res,next) => {
  return eventsModel.updateOneEvent(req.params.id, req.body).then((updateE) => {
    return updateE.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateE)
  })
}

const deleteEvent = (req,res,next) => {
  return eventsModel.deleteEvent(req.params.id).then((deleteE) => {
    return deleteE.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteE)
  })
}

//Pickup_locations
const getAllPickupLocations = (req,res,next) => {
  return pickupsModel.getAllLocations(req.params.id).then((getAllP)=>{
    return getAllP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getAllP)
  })
}
const getOnePickupLocation = (req,res,next) => {
  return pickupsModel.getOneLocation(req.params.pid,req.params.id).then((getOneP)=>{
    return getOneP.error ? next({status:404,message:"Not found"}) : res.status(200).send(getOneP)
  })
}
const createPickupLocation = (req,res,next) => {
  return pickupsModel.addNewLocation(req.body).then((createP)=>{
    return createP.error ? next({status:400,message:"Failed to Post"}) : res.status(201).send(createP)
  })
}
const updatePickupLocation= (req,res,next) => {
  return pickupsModel.updateLocation(req.params.id,req.body).then((updateP)=>{
    return updateP.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateP)
  })
}
const deletePickupLocation = (req,res,next) => {
  return pickupsModel.deleteLocation(req.params.id).then((deleteP)=>{
    return deleteP.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteP)
  })
}
const pulA = (req,res,next) => {
  return pickupsModel.pul1().then((pulAA)=>{
    return pulAA.error ? next({status:404,message:"not foune"}) : res.status(200).send(pulAA)
  })
}
const pulO = (req,res,next) => {
  return pickupsModel.pul2(req.params.id).then((pulOO)=>{
    return pulOO.error ? next({status:404,message:"not foune"}) : res.status(200).send(pulOO)
  })
}//I dont know why I thought this needed to exist but its here
//buses

const getAllBuses = (req, res, next) => {
  return busesModel.getAllBuses()
  .then((getAllB) => {
    return getAllB.error ? next({status:404, message:"Not found"}) : res.status(200).send(getAllB)
  })
}

const getOneBus = (req, res, next) => {
  return busesModel.getOneBus(req.params.id)
  .then((getOneB) => {
    return getOneB.error ? next({status:404, messag:"Not found"}) : res.status(200).send(getOneB)
  })
}

const createBus = (req,res,next) => {
  return busesModel.addNewBus(req.body).then((createBus) => {
    return createBus.error ? next({status:400,message:"Failed to Post"}) :
    res.status(201).send(createBus)
  })
}

const updateBus = (req,res,next) => {
  return busesModel.updateBus(req.params.id,req.body).then((updateB) => {
    return updateB.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateB)
  })
}

const deleteBus = (req,res,next) => {
  return busesModel.deleteBus(req.params.id).then((deleteB)=>{
    return deleteB.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteB)
  })
}

//reservations controllers boiiiiii
const getAllReservations = (req,res,next) => {
  return reservationsModel.getAllR().then((allReservations)=>{
    return allReservations.error ? next({status:404,message:"not found"}) : res.status(200).send(allReservations)
  })
}
const getOneReservation = (req,res,next) => {
  return reservationsModel.getOneR(req.params.id).then((oneReservation)=>{
    return oneReservation.error ? next({status:404,message:"not found"}) : res.status(200).send(oneReservation)
  })
}
const createReservation = (req,res,next) => {
  return reservationsModel.createR(req.body).then((createdReservation)=>{
    return createdReservation.error ? next({status:400,message:"Failed to create reservation"}) : res.status(201).send(createdReservation)
  })
}
const updateReservation = (req,res,next) => {
  return reservationsModel.updateR(req.params.id,req.body).then((updatedReservation)=>{
    return updatedReservation.error ? next({status:400,message:"Failed to update reservation"}) : res.status(202).send(updatedReservation)
  })
}
const deleteReservation = (req,res,next) => {
  return reservationsModel.deleteR(req.params.id).then((deletedReservation)=>{
    return deletedReservation.error ? next({status:404,message:"Failded to delete reservation"}) : res.status(204).send(deletedReservation)
  })
}
const getAllReservationsByUser = (req,res,next) => {
  return reservationsModel.getAllByUser(req.params.id).then((ress4user)=>{
    return ress4user.error ? next({status:404,message:"not found"}) : res.status(200).send(ress4user)
  })
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  userPickupCheckinList,
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
  pulA,
  pulO,
  getAllBuses,
  getOneBus,
  createBus,
  updateBus,
  deleteBus,
  getAllReservations,
  getOneReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  getAllReservationsByUser
}
