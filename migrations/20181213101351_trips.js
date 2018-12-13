exports.up = (knex) => {
  return knex.schema.createTable('trips', (table) => {
    table.increments('id')
    table.integer('busId').notNullable()
    table.foreign('busId').references('buses.id')
    table.integer('eventId').notNullable()
    table.foreign('eventId').references('events.id')
    table.integer('pickupLocationId').notNullable()
    table.foreign('pickupLocationId').references('pickup_locations.id')
    table.integer('driverId').notNullable()
    table.foreign('driverId').references('users.id')
    table.time('departureTime').notNullable().defaultsTo('18:00:00')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("trips") 
}
