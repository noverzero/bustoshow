
exports.up = (knex) => {
  return knex.schema.createTable('reservations', (table) => { 
    table.increments('id')
    table.integer('userId').references('users.id').onDelete('CASCADE')
    table.integer('tripId').references('trips.id').onDelete('CASCADE')
    table.boolean('isPaid').notNullable().defaultsTo('false')
    table.boolean('isFavorite').notNullable().defaultsTo('false')
}

exports.down = (knex) => {
  return knex.schema.dropTable("reservations") 
}
