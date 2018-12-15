//buses Model
//busses THESE ARE THE buses ROUTES for reference
          //X router.get("/buses", controller.getAllBuses)//get all busses
          //X router.get("/buses/:id", controller.getOneBus)//get one bus
          //Xrouter.post("/buses", controller.createBus)//create a bus
          //X router.patch("/buses/:id", controller.updateBus)//update a bus
          // router.delete("/buses/:id", controller.deleteBus)//delete a bus



// Get /busses      Retrieve all buses
const getAllBuses = () => {
  return knex('buses')
  .select('*')
  .then((buses) => {
    return buses
  })
}

// GET /buses/:id            Retrieve single Event
const getOneBus = (id) => {
  return knex('buses')
  .select(['id', 'busCode', 'name', 'capacity'])
  .where('id', id)
  .first()
  .then((bus) => {
    if (!id || !bus) {
      return error
    }
    return event
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
  let busName = busInfo.name
  let busCode = busInfo.busCode
  let busCapacity = busInfo.capacity
console.log(id)
console.log(busInfo)
  if (!id) {
    return error
  }
  return knex('buses')
  .where('id', id)
  .update(busInfo)
  .returning(['busCode', 'name', 'capacity'])
  .first()
  .then((bus) => {

    return bus
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
