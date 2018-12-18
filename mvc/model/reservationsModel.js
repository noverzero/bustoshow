const knex = require("../../knex.js")

const getAllR = () => {
  return knex("events").select("date","headliner","startTime")
  .innerJoin("trips","events.id","trips.eventId").select("*")
  .innerJoin("pickup_locations","pickup_locations.id","trips.pickupLocationId")
  .innerJoin("reservations","reservations.tripId","trips.id").select("*")
  .innerJoin("users","users.id","reservations.userId").then((bigAssObjectArray)=>{
    return bigAssObjectArray.reduce((whereTheseObjectsAreAccumulating,singleObjectFromBigAssObjectArray)=>{
      const {email,firstName,lastName,venue,headliner,streetAddress,locationName,date,departureTime} = singleObjectFromBigAssObjectArray
      whereTheseObjectsAreAccumulating.push({email,firstName,lastName,venue,headliner,streetAddress,locationName,date,departureTime})
      return whereTheseObjectsAreAccumulating
    },[])//quad join woot blake loves you
  })
}
const getOneR = (resId) => {
  if(!resId){
    return {error: "error snake returns"}
  }else{
    return knex("events").select("date","headliner","startTime")
    .innerJoin("trips","events.id","trips.eventId").select("*")
    .innerJoin("pickup_locations","pickup_locations.id","trips.pickupLocationId")
    .innerJoin("reservations","reservations.tripId","trips.id").select("*").where("reservations.id",resId)
    .innerJoin("users","users.id","reservations.userId").then((bigAssObjectArray)=>{
      return bigAssObjectArray.reduce((whereTheseObjectsAreAccumulating,singleObjectFromBigAssObjectArray)=>{
        const {email,firstName,lastName,venue,headliner,streetAddress,locationName,date,departureTime} = singleObjectFromBigAssObjectArray
        whereTheseObjectsAreAccumulating.push({email,firstName,lastName,venue,headliner,streetAddress,locationName,date,departureTime})
        return whereTheseObjectsAreAccumulating
      },[])[0]//quad join woot blake loves you
    })
  }
}
const getAllByUser = (userId) => {
  if(!userId){
    return {error: "error snake returns"}
  }else{
    return knex("events").select("date","headliner","startTime")
    .innerJoin("trips","events.id","trips.eventId").select("*")
    .innerJoin("pickup_locations","pickup_locations.id","trips.pickupLocationId")
    .innerJoin("reservations","reservations.tripId","trips.id").select("*")
    .innerJoin("users","users.id","reservations.userId").where("users.id",userId).then((bigAssObjectArray)=>{
      return bigAssObjectArray.reduce((whereTheseObjectsAreAccumulating,singleObjectFromBigAssObjectArray)=>{
        const {email,firstName,lastName,venue,headliner,streetAddress,locationName,date,departureTime} = singleObjectFromBigAssObjectArray
        whereTheseObjectsAreAccumulating.push({email,firstName,lastName,venue,headliner,streetAddress,locationName,date,departureTime})
        return whereTheseObjectsAreAccumulating
      },[])//quad join woot blake loves you
    })
  }
}
const createR = () => {

}
const updateR = () => {

}
const deleteR = () => {

}
module.exports = {
  getAllR,
  getOneR,
  createR,
  updateR,
  deleteR,
  getAllByUser
}
