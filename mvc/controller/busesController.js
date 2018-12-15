const pickupsModel = require("../model/pickupsModel.js")
const eventsModel = require("../model/eventsModel.js")
const busesModel = require("../model/busesModel.js")

// Buses Controller
const busesModel = require("../model/busesModel")

//busses THESE ARE THE buses ROUTES for reference
          // router.get("/buses", controller.getAllBuses)//get all busses
          // router.get("/buses/:id", controller.getOneBus)//get one bus
          // router.post("/buses", controller.createBus)//create a bus
          // router.patch("/buses/:id", controller.updateBus)//update a bus
          // router.delete("/buses/:id", controller.deleteBus)//delete a bus

          //buses

          const getAllBuses = (req, res, next) => {
            return busesModel.getAllBuses()
            .then((getAllB) => {
              return getAllB.error ? next({status:404, message:"Not found"}) : res.status(200).send(getAllB)
            })
          }

          const getOneBus = (req, res, next) => {
            return busesModel.getOneBus()
            .then((getOneB) => {
              return getOneB.error ? next({status:404, messag:"Not found"}) : res.status(200).send(getOneB)
            })
          }

          const createBus = (req,res,next) => {
            return busesModel.addNewBus(req.body).then((createBus) => {
              return createBus.error ? next({status:400,message:"Failed to Post"}) :
              res.status(201).send(createEvent)
            })
          }

          const updateBus = (req,res,next) => {
            return busesModel.updateBus(req.params.id).then((updateB) => {
              return updateB.error ? next({status:400,message:"Failed to Patch"}) : res.status(202).send(updateB)
            })
          }

          const deleteBus = (req,res,next) => {
            return busesModel.deleteBus(req.params.id).then((deleteB)=>{
              return deleteB.error ? next({status:404,message:"Failed to Delete"}) : res.status(204).send(deleteB)
            })
          }
