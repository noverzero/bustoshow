
exports.up = (knex) => {
  return knex.schema.createTable("usersEvents",(table)=>{
    table.increments()
    table.integer("userId").references("users.id")
    table.integer("eventId").references("events.id")
    table.boolean("isPaid").defaultsTo("false")
    table.boolean("isFavorite").defaultsTo("true")
    table.timestamps(true,true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("usersEvents")
}
