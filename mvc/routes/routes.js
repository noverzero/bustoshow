const express = require('express')
const router = express.Router()
const controller = require("../controller/controller.js")
const knex = require('../../knex.js')



// PICKUP LOCATIONS

// Get All pickup locations
router.get('/pickup', function(req, res, next){
  knex('pickup_locations')
  .select('locationName', 'streetAddress')
  .then((data) => {
  res.status(200).json(data)
    })
  })
  
  
  // Get One pickup location -- this response displays with price and departure time on reservation page.
  
  router.get('/pickup/:id', function(req, res, next){
  knex('pickup_locations')
  .select('locationName', 'streetAddress')
  .where('id', req.params.id)
  .then((data) => {
    res.status(200).json(data[0])
  })
  })
  
  // Post add new location (superadmin or, eventually, seeder )
  router.post('/pickup', function(req, res, next){
  // use req.body
  knex('pickup_locations')
  .insert(req.body)
  .returning(['locationName', 'streetAddress'])
  .then((data) => {
    res.status(200).json(data[0])
  })
  })
  
  // Patch - update location details (superadmin)
  router.patch('/pickup/:id', function(req, res, next){
  knex('pickup_locations')
  .where('id', req.params.id)
  .update(req.body)
  .returning(['locationName', 'streetAddress'])
  .then((data) => {
    res.status(200).json(data[0])
  })
  })
  // Delete one pickup location (superadmin)
  router.delete('/pickup/:id', function(req, res, next){
  knex('pickup_locations')
  .where('id', req.params.id)
  .del('*')
  .returning(['locationName', 'streetAddress'])
  .then((data) => {
    res.status(200).json(data[0])
  })
  })

module.exports = router
