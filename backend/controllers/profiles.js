const knex = require('./../db/db.js')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

exports.getAll = async (request, response) => {
  knex
    .select('*')
    .from('profiles')
    .then(profileData => {
      response.json(profileData)
    })
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
}

exports.getProfile = async ( request, response) => {
  knex('profiles')
    .where('id', request.body.id)  
    .then((profile) => {
      if (profile) {
        response.json(profile)
      } else {
        response.status(404).end()
      }})
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
}


exports.createProfile = async (request, response) => {
  const body = request.body

  const newProfile = {
    'nickname': body.nickname,
    'age': body.age,
    'profiletext': body.profiletext
  }
  
  knex('profiles')
    .insert(newProfile)
    .then(() => {
      response.json(`Profiilin nimeltä ${body.nickname} lisääminen onnistui`)
    })
    .catch(err => {
      return response
      .status(400)
      .json({ message: `Error: ${err}` })
    })
}

//TODO: add a route for modifying own profile

