const knex = require("../../knex.js")
const jwt = require('jsonwebtoken')
const loginKey = process.env.JWT_KEY
const error = { status: 400, message: 'Bad email or password' }
const bcrypt = require('bcryptjs')

// check if logged in
const checkToken = (cookie) => {
  jwt.verify(cookie.token, loginKey, (err) => {
    if (err) {
      res.send(false)
    }
    else {
      res.send(true)
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
        delete currentUser.hshPwd
        const token = jwt.sign(currentUser, loginKey, { expiresIn: '30d' })
        res.cookie('token', token, { httpOnly: true })
        res.send(currentUser)
      }
      return error
    })
}

const logOutUser = () => {
  res.cookie('token', '', { httpOnly: true })
  .send()
}

module.exports = {
  checkToken,
  logInUser,
  logOutUser

}