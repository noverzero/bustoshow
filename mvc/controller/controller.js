const pickupsModel = require("../model/pickupsModel.js")
const eventsModel = require("../model/eventsModel.js")
const busesModel = require("../model/busesModel.js")
const tokenModel = require("../model/tokenModel.js")
const usersModel = require("../model/usersModel.js")

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
//   let userUpdated = model.
//   return userUpdated.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(userUpdated)
}

//token
const getToken = (req,res,next) => {
  return tokenModel.checkToken(req.header.cookie).then((tokenChecked) => {
    return tokenChecked.error ? next({status:401,message:"Unauthorized"}) : res.status(200).send(tokenChecked)
  })
}

const signIn = (req,res,next) => {
  return tokenModel.logInUser(req.body).then((loginValidate) => {
    if (loginValidate.error) {
      next({
        status:400,message:"Invalid username or password"
      })
    } else {
      console.log(loginValidate)
      res.cookie('token', loginValidate, { httpOnly: true })
      .redirect('localhost:3000')
    }
  })
}

const logOut = (req,res,next) => {
  return tokenModel.logOutUser(req).then((tokenDeleted) => {
    return tokenDeleted.error ? next({status:404,message:"Failed to Log Out"}) : res.status(204).send(tokenDeleted)
  })
  // return res.tokenModel.logOutUser(req)
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
  pulA,
  pulO,
  getAllBuses,
  getOneBus,
  createBus,
  updateBus,
  deleteBus
}
