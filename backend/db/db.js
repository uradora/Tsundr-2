const path = require('path')

const dbPath = path.resolve(__dirname, 'database.sqlite')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

knex.schema
  .hasTable('profiles')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('profiles', (table)  => {
          table.increments('id').primary()
          table.string('username')
          table.integer('age')
          table.string('profiletext')
        })
        .then(() => {
          console.log('Table \'Profiles\' created')
        })
        .catch((error) => {
          console.error(`Cannot create table: ${error}`)
        })
      }
    })
    .then(() => {
      console.log('Ready!')
    })
    .catch((error) => {
      console.error(`Cannot open: ${error}`)
    })

knex.select('*').from('profiles')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

module.exports = knex
