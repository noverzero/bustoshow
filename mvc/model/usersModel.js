const knex = require("../../knex.js")

// const checkToken = require('checkToken')
// const logInUser = require('logInUser')
// const logOutUser = require('logOutUser')
const bcrypt = require('bcryptjs')

//These are the "user" paths fronm routes.js for reference
    // //users
    // router.get("/users/:id", controller.getUser)//get user profile
    // router.post("/users", controller.createUser)//create new user
    // router.patch("/users/:id", controller.updateUser)//update user or deactivate user




//Jake's Bookshelf Example:
// bcrypt.hash(req.body.password, 10).then((hash) => {
//   knex('users')
//     .insert({
//       first_name: body.first_name,
//       last_name: body.last_name,
//       email: body.email,
//       hashed_password: hash
//
//     })
//     .returning(['id', 'first_name', 'last_name', 'email'])
//     .then((user) => {
//       res.status(200).send(user[0])
//     })
// })
// })



//get all users (admin)
const getAllUsers = () => {
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
// use req.body
const addNewUser = (body) => {
  const {firstName, lastName, email, isWaiverSigned, userType, plainTextPassword} = body
  if (!firstName || !lastName || !email || !isWaiverSigned || !plainTextPassword) {
    return {error:"fields required"}
  }
  return getAllUsers().then((userArr)=>{
    for(let i = 0; i < userArr.length; i++){
      if(userArr[i].email == email){
        console.log("here?");
        return {error:"this address is already registered"}
      }
    }
    let hshPwd = bcrypt.hashSync(plainTextPassword, 8)
    return knex('users')
    .insert({firstName, lastName, email, isWaiverSigned, userType, hshPwd})
    .returning("*")
    .then(data => data[0])
  })
}

// PATCH /user/:id 	Update a single user
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
//   .returning(['firstName', 'last_name'])
//   .then((user) => {
//     return user[0]
//   })
// }
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
  getAllUsers,
  // getOneUser,
  addNewUser
  // updateUser,
  // deleteUser
}
