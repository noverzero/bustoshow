exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('email').notNullable()
    table.boolean('isWaiverSigned').notNullable().defaultTo('false')
    table.string('userType').notNullable().defaultTo('standard')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("events")
}
