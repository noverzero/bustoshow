const express = require('express')
const router = express.Router()
const controller = require("../controller/controller.js")

//users
router.get("/users/:id", controller.getUser)//get user profile
router.post("/users", controller.createUser)//create new user
router.patch("/users/:id", controller.updateUser)//update user or deactivate user

//token
router.get("/token", controller.getToken)// geting the oauth token
router.post("/token", controller.signIn)// sign in
router.delete("/token", controller.logOut)// log out

//events
router.get("/events/:eventId/pickup/:pickupId", controller.userPickupCheckinList)//get all users for one pickup location for one event
router.post("/events", controller.createEvents)//stretch add events
router.get("/events", controller.getAllEvents)// get all events
router.get("/events/:id", controller.getOneEvent)// get an event
router.get("/events/?", controller.eventQuery)//stretch query events
router.patch("/events/:id", controller.updateEvent)// update event
router.delete("/events/:id", controller.deleteEvent)// delete event

//Pickup_locations
router.get("/events/:id/pickup", controller.getAllPickupLocations)// get all pickup locations for event
router.get("/events/:id/pickup/", controller.getOnePickupLocation)//get one pickup location for event
router.get("/pickup",controller.pulA)//for homepage
router.get("/pickup/:id",controller.pulO)//this gets all instances of the same pickup location and isn't dependent on what show that pickup location is being used
router.post("/pickup", controller.createPickupLocation)// create pickup location
router.patch("/pickup/:id", controller.updatePickupLocation)// update pickup location
router.delete("/pickup/:id", controller.deletePickupLocation)// delete pickup location

//busses
router.get("/buses", controller.getAllBuses)//get all busses
router.get("/buses/:id", controller.getOneBus)//get one bus
router.post("/buses", controller.createBus)//create a bus
router.patch("/buses/:id", controller.updateBus)//update a bus
router.delete("/buses/:id", controller.deleteBus)//delete a bus

//reservations
router.get("/reservations",controller.getAllReservations)//get all reservations
router.get("/reservations/:id",controller.getOneReservation)//get one reservation
router.post("/reservations",controller.createReservation)//create reservation
router.patch("/reservations/:id",controller.updateReservation)//update reservation
router.delete("/reservations/:id",controller.deleteReservation)//delete reservation
router.get("/reservations/user/:id",controller.getAllReservationsByUser)//get all reservations for a single user when a user has multiple

//payments
router.post("/charge", controller.stripeTokenHandler)//accept CC token, create charge 
module.exports = router
