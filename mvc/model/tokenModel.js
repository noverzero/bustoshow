const knex = require("../../knex.js")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const loginKey = process.env.JWT_KEY
const error = { error: "ssssss im an error snake" }
const bcrypt = require('bcryptjs')


// check if logged in
const checkToken = (cookie) => {
  jwt.verify(cookie.token, loginKey, (err) => {
    if (err) {
      return false
    }
    else {
      return true
    }
  })
}

// validate login 
const logInUser = (user) => {
  let currentUser

  return knex('users')
    .where('email', user.email)
    .select('*')
    .first()
    .then((userExists) => {
      if (userExists) {
        currentUser = userExists
        return bcrypt.compare(user.password, currentUser.hshPwd)
      }
      return error
    })
    .then((passwordMatch) => {
      if (passwordMatch) {
        delete currentUser.hshPwd
        const token = jwt.sign(currentUser, loginKey, { expiresIn: '30d' })
        return token
      }
      return error
    })
    .catch( err => error )
  }
  
module.exports = {
  checkToken,
  logInUser
}
