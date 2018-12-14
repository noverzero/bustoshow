const express = require('express')
const router = express.Router()
const controller = require("../controller/controller.js")

//users
router.get("/users/:id")//get user profile
router.post("/users")//create new user
router.patch("/users/:id")//update user or deactivate user
//token
router.get("/token")// geting the oauth token
router.post("/token")// sign in
router.delete("/token")// log out
//events
router.post("/events")//stretch add events
router.get("/events")// get all events
router.get("/events/:id")// get an event
router.get("/events/?")//stretch query events
router.patch("/event/:id")// update event
router.delete("/event/:id")// delete event
//Pickup_locations
router.get("/event/:id/pickup")// get all pickup locations for event
router.get("/event/:id/pickup/:pid")//get one pickup location for event
router.post("/pickup")// create pickup location
router.patch("/pickup/:id")// update pickup location
router.delete("/pickup/:id")// delete pickup location
//busses
router.get("/buses")//get all busses
router.get("/buses/:id")//get one bus
router.post("/buses")//create a bus
router.patch("/buses/:id")//update a bus
router.delete("/buses/:id")//delete a bus

module.exports = router
