
exports.up = (knex) => {
  return knex.schema.createTable("pickupLocations",(table)=>{
   table.increments()
   table.string("streetAddress").notNullable()
   table.string("locationName").notNullable()
}

exports.down = (knex) => {
  return knex.schema.dropTable("pickupLocations")
}
