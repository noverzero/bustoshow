
exports.up = (knex) => {
  return knex.schema.createTable('trips', (table) => {
    table.integer('id')
    table.integer('busId').references('buses.id')
    table.integer('eventId').references('events.id')
    table.integer('pickupLocationId').references('pickupLocations.id')
    table.integer('driverId').references('users.id')
    table.time('departureTime').notNullable().defaultsTo('18:00:00')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("trips") 
}
