exports.up = (knex) => {
  return knex.schema.createTable("pickup_locations",(table)=>{
    table.increments()
    table.string("streetAddress").notNullable()
    table.string("locationName").notNullable()
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("pickup_locations")
}
