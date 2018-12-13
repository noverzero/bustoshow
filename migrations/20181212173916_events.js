exports.up = (knex) => {
  return knex.schema.createTable("events",(table)=>{
    table.increments()
    table.string("venue").notNullable().defaultTo("")
    table.string("headliner").notNullable().defaultsTo("")
    table.date("date").notNullable()
    table.time("startTime").notNullable()
    table.timestamps(true,true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("events")
}
