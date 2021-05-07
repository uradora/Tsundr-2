const knex = require('./../db/db.js')
const bcrypt = require('bcrypt')

exports.getAll = async (request, response) => {
  knex
    .select('*')
    .from('users')
    .then(userData => {
      response.json(userData)
    })
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
}

exports.getUser = async ( request, response) => {
  knex('users')
    .where('id', request.body.id)  
    .then((user) => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }})
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
}

exports.createUser = async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (body.username === undefined || body.password === undefined) {
    return response.status(400).json({ error: "Käyttäjätunnus tai salasana puuttui!" });
  }
  if (body.username.length < 3 || body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "Käyttäjätunnuksen ja salasanan pitää olla ainakin 3 merkin pituisia!" });
  }

  const newUser = {
    'username': body.username,
    'password': passwordHash
  }
  
  knex('users')
    .where('username', body.username)
    .then((user) => {
      if (user[0] !== undefined) {
        return response
         .status(400)
         .json({ message: `Käyttäjätunnus on jo käytössä`})
      } else {
        knex('users')
          .insert(newUser)
          .then(() => {
            response.json(`Käyttäjän ${body.username} lisääminen onnistui`)
        })

      }
    })  

}
