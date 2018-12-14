// let knex = require('../../knex.js')  //uncomment this when knex.js exists and is connected to databases

const getOneLoc = knex('pickup_locations')
.select('locationName', 'streetAddress')
.where('id', req.params.id)
.then((data) => {
  return data[0]
}

module.exports = {getOneLoc}//knex functions go in here
