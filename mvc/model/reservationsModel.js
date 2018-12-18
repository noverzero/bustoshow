const knex = require("../../knex.js")
const users = require("../model/usersModel.js")

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
const createR = (bodyByReservations) => {
  let userId
  const {email,tripId,isPaid,isFavorite} = bodyByReservations
  if(!email||!tripId){
    return {error:"ssssssssssssssssssssssssssss"}
  }else{
    return users.getAllUsersEmails().then((arrayOfUsers)=>{
      for(let i = 0; i < arrayOfUsers.length; i++){
        if(email === arrayOfUsers[i].email){
          userId = arrayOfUsers[i].id
        }
      }
      return knex("reservations").insert({userId,tripId,isPaid,isFavorite}).returning("*")
    }).then(data=>data[0])
  }
}
const updateR = (reservationId,body) => {
  let userId
  const {email,tripId,isPaid,isFavorite} = body
  if(!email||!tripId||!reservationId){
    return {error:"ssssssssssssssssssssssssssss"}
  }else{
    return users.getAllUsersEmails().then((arrayOfUsers)=>{
      for(let i = 0; i < arrayOfUsers.length; i++){
        if(email === arrayOfUsers[i].email){
          userId = arrayOfUsers[i].id
        }
      }
      return knex("reservations").where('id',reservationId).update({userId,tripId,isPaid,isFavorite}).returning("*")
    }).then(data=>data[0])
  }
}
const deleteR = (resId) => {
  return !resId ? {error: "error snake returns"} : knex("reservations").del().returning("*").where("reservations.id",resId).then(data=>data)
}
module.exports = {
  getAllR,
  getOneR,
  createR,
  updateR,
  deleteR,
  getAllByUser
}
