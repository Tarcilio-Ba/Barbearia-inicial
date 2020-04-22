const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config])// chamar a migrate automaticamente
module.exports = knex