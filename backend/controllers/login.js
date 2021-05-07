const knex = require('./../db/db.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

exports.login = async (request, response) => {
  const body = request.body

  knex('users')
    .where('username', body.username)
    .then((user) => {
      if (user[0] !== undefined) {
        bcrypt.compare(body.password, user[0].password)
          .then((passwordCorrect) => {
            if (passwordCorrect) {
              const userForToken = {
                username: user[0].username,
                id: user[0].id
              }
              const token = jwt.sign(userForToken, process.env.SECRET)
              response
                .status(200)
                .send({ token, username: user[0].username })
            } else {
                return response
                  .status(401)
                  .json( { message: 'Väärä salasana'})
            }
          })
          .catch((err) => {
            return response
              .status(401)
              .json( { message: 'Väärä käyttäjätunnus tai salasana'})
          })
      } else {
        return response
         .status(401)
         .json({ message: `Väärä käyttäjätunnus`})
      }
    })  
}
    
