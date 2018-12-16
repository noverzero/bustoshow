const knex = require("../../knex.js")
const jwt = require('jsonwebtoken')
const loginKey = process.env.JWT_KEY
const error = { error: "ssssss im an error snake" }
const bcrypt = require('bcryptjs')

// check if logged in
const checkToken = (token) => {
  jwt.verify(token, loginKey, (err) => {
    if (err) {
      return false
    }
    else {
      return true
    }
  })
}

// validate login attempt

const logInUser = (user) => {
  let currentUser

  knex('users')
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
        // delete currentUser.hshPwd //dont want to delete our database hashed passwords
        const token = jwt.sign(currentUser, loginKey, { expiresIn: '30d' })
        res.cookie('token', token, { httpOnly: true })//how does res work when its undefined?
        return currentUser
      }
      return error
    })
}

const logOutUser = (cookie) => {
  return cookie('token', '', { httpOnly: true })//does this work? check controller. should we just write these in the controller so that the res and req are defined?
  //.clearCookie()
}

module.exports = {
  checkToken,
  logInUser,
  logOutUser

}
