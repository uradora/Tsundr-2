const path = require('path')

const db = path.resolve(__dirname, 'db/database.sqlite')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: db,
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
          console.error(`Error: ${error}`)
        })
      }
    })
    .then(() => {
      console.log('Ready!')
    })
    .catch((error) => {
      console.error(`Error: ${error}`)
    })

knex.select('*').from('profiles')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

module.exports = knex
