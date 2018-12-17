const knex = require("../../knex.js")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const loginKey = process.env.JWT_KEY
const error = { error: "ssssss im an error snake" }
const bcrypt = require('bcryptjs')


// check if logged in
const checkToken = (cookie) => {
  return jwt.verify(cookie, loginKey, (err) => {
    if (!err) {
      return true
    }
    else {
      return false
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
      if (userExists.email === user.email) {
        currentUser = userExists
        return bcrypt.compare(user.password, currentUser.hshPwd)
      }
      return error
    })
    .then((passwordMatch) => {
      if (passwordMatch) {
        delete currentUser.hshPwd //dont want to delete our database hashed passwords
        const token = jwt.sign(currentUser, loginKey, { expiresIn: '30d' })
        return token
      }
      return error
    }).catch(err=>error)
}

module.exports = {
  checkToken,
  logInUser
}
