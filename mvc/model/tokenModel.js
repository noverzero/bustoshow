const knex = require("../../knex.js")
const jwt = require('jsonwebtoken')
const loginKey = env.TM

const checkToken = (token, loginKey) => {
  jwt.verify(token, loginKey)
}



module.exports = {

}