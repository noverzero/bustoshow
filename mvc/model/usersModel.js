const knex = require("../../knex.js")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const loginKey = process.env.JWT_KEY
// const checkToken = require('checkToken')
// const logInUser = require('logInUser')
// const logOutUser = require('logOutUser')
const bcrypt = require('bcryptjs')

//These are the "user" paths from routes.js for reference
    // //users
    // router.get("/users/:id", controller.getUser)//get user profile
    // router.post("/users", controller.createUser)//create new user
    // router.patch("/users/:id", controller.updateUser)//update user or deactivate user


//get all users (admin)
const getAllUsersEmails = () => {
  return knex('users')
  .select('email')
  .then((users) => {
    return users
  })
}



// GET /users/:id            Retrieve single user
// const getOneUser = (id) => {
//   if (!id ) {
//     console.log('id inside error', id)
//     return {error:"invalid id"}
//   }
//   return knex('users')
//   .select('id', 'userCode', 'name', 'capacity')
//   .where('users.id', id)
//   .first()
//   .then((user) => {
//     return user
//   })
// }

// POST New User
// Create New User Account
const addNewUser = (body) => {
  const {firstName, lastName, email, isWaiverSigned, userType, plainTextPassword} = body
  if (!firstName || !lastName || !email || !isWaiverSigned || !plainTextPassword) {
    return {error:"fields required"}
  }
  return getAllUsersEmails().then((userArr)=>{
    for(let i = 0; i < userArr.length; i++){
      if(userArr[i].email == email){
        return {error:"this email is already registered"}
      }
    }
    let hshPwd = bcrypt.hashSync(plainTextPassword, 8)
    return knex('users')
    .insert({firstName, lastName, email, isWaiverSigned, userType, hshPwd})
    .returning("firstName","lastName","email","isWaiverSigned","userType")
    .then(newUser => newUser[0])
  })
}

// patch route for updating user // update userType needs to be a separate function
const editUserInfo = (userId, updatedInfo) => {
  if (!userId) {
    return {error:"invalid ID"}
  } 
  if (updatedInfo.email) {
    return getAllUsersEmails()
    .then((userArr) => {
      // console.log(userArr)
      let result = true
      for (let i = 0; i < userArr.length; i++){
        if (userArr[i].email === updatedInfo.email){
          result = false
        }
      }
      if (result) { 
        return knex('users')
          .where('id', userId)
          .update(updatedInfo)
          .returning(["firstName", "lastName", "email"])
        .then((updatedUser) => {
          return updatedUser[0]
        })
      } else {
        return {error:"email is already registered"}
      }
    })
  }  
}

const getUserPickupCheckInList = (eventId, pickupId) => {
  if(!pickupId || !eventId) {
    return {error: "NOTTA CHANCE"}
  } 
  return knex("trips")
      .select("trips.id","eventId","pickupLocationId")
    .innerJoin("events","trips.eventId","events.id")
      .select("*")//"venue","date","headliner"
      .where("events.id",eventId)
    .innerJoin("pickup_locations","trips.pickupLocationId","pickup_locations.id")
      .select("*")
      .where("pickup_locations.id",pickupId)
    .innerJoin("reservations","trips.id","reservations.tripId")
      .select("*")
    .innerJoin("users","reservations.userId","users.id")
      .select("*")//"firstName","lastName"
    .then((userPickupListInfo) => {
      return userPickupListInfo.reduce((userCheckinList, userCheckinListObject) => {
        const {firstName,lastName,locationName,headliner} = userCheckinListObject
        userCheckinList.push({firstName,lastName,locationName,headliner})
        return userCheckinList
      },[])
    })
}



// // PATCH /user/:id 	ADMIN - deactivate a single user
// const updateUser = (id, userInfo) => {
//   const {userCode,name,capacity} = userInfo
//   if(!userCode||!name||!capacity){
//     return {error:"fields required"}
//   }
//   if (!id) {
//     return {error:"invalid id"}
//   }
//   return knex('users')
//   .where('id', id)
//   .update(userInfo)
//   .returning(['userCode', 'name', 'capacity'])
//   .then((user) => {
//     return user[0]
//   })
// }

module.exports = {
  getUserPickupCheckInList,
  getAllUsersEmails,
  // getOneUser,
  addNewUser,
  editUserInfo
  // deleteUser
}
