'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bus_to_show_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
