
exports.up = (knex) => {
  return knex.schema.createTable('trips', (table) => {
    table.integer('id')
    table.integer('busId').references('buses.id').onDelete('CASCADE')
    table.integer('eventId').references('events.id').onDelete('CASCADE')
    table.integer('pickupLocationId').references('pickup_locations.id').onDelete('CASCADE')
    table.integer('driverId').references('users.id').onDelete('CASCADE')
    table.time('departureTime').notNullable().defaultsTo('18:00:00')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("trips") 
}
