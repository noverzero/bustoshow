//buses Model
//busses THESE ARE THE buses ROUTES for reference
          //X router.get("/buses", controller.getAllBuses)//get all busses
          //X router.get("/buses/:id", controller.getOneBus)//get one bus
          //Xrouter.post("/buses", controller.createBus)//create a bus
          //X router.patch("/buses/:id", controller.updateBus)//update a bus
          // router.delete("/buses/:id", controller.deleteBus)//delete a bus



// Get /busses      Retrieve all buses
const knex = require("../../knex.js")

const getAllBuses = () => {
  return knex('buses')
  .select('*')
  .then((buses) => {
    return buses
  })
}

// GET /buses/:id            Retrieve single Event
const getOneBus = (id) => {
  if (!id ) {
    console.log('id inside error', id)
    return {error:"invalid id"}
  }
  return knex('buses')
  .select('id', 'busCode', 'name', 'capacity')
  .where('buses.id', id)
  .first()
  .then((bus) => {
    return bus
  })
}

// POST New Bus
// Post add new bus (admin )
// use req.body
const addNewBus = (body) => {
  const {busCode, name, capacity} = body
  if (!busCode || !name || !capacity) {
    return {error:"fields required"}
  }
  return knex('buses')
  .insert({busCode, name, capacity})
  .returning("*")
  .then(data => data[0])
}

// PATCH /bus/:id 	Update a single bus
const updateBus = (id, busInfo) => {
  const {busCode,name,capacity} = busInfo
  if(!busCode||!name||!capacity){
    return {error:"fields required"}
  }
  if (!id) {
    return {error:"invalid id"}
  }
  return knex('buses')
  .where('id', id)
  .update(busInfo)
  .returning(['busCode', 'name', 'capacity'])
  .then((bus) => {
    return bus[0]
  })
}
// Delete a Bus  (superadmin)
const deleteBus = (id) => {
  if (!id) {
    return {error:"can't delete that id"}
  }
  return knex('buses')
  .where('id', id)
  .del('*')
  .returning(['busCode', 'name', 'capacity'])
  .then(data => data)
}

module.exports = {getAllBuses,getOneBus,addNewBus,updateBus,deleteBus}
