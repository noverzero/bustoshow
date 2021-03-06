exports.up = (knex) => {
  return knex.schema.createTable('reservations', (table) => { 
    table.increments('id')
    table.integer('userId')
    table.foreign('userId').references('users.id')
    table.integer('tripId')
    table.foreign('tripId').references('trips.id')
    table.boolean('isPaid').notNullable().defaultsTo('false')
    table.boolean('isFavorite').notNullable().defaultsTo('false')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("reservations") 
}
