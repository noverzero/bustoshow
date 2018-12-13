exports.up = (knex) => {
  return knex.schema.createTable("buses",(table)=>{
    table.increments()
    table.integer("capacity").notNullable()
    table.string("name").notNullable().defaultsTo("")
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable("buses")
}
