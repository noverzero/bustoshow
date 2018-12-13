exports.up = (knex) => {
  return knex.schema.createTable("users_events",(table)=>{
    table.increments()
    table.integer("userId").notNullable()
    table.foreign("userId").references("users.id")
    table.integer("eventId").notNullable()
    table.foreign("eventId").references("events.id")
    table.boolean("isPaid").defaultsTo("false")
    table.boolean("isFavorite").defaultsTo("false")
    table.timestamps(true,true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("users_events")
}
