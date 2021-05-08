const knex = require('./../db/db.js')
const bcrypt = require('bcrypt')
const { request } = require('express')
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

exports.getProfile = async (request, response) => {
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

exports.getByUserId = async (request, response) => {
  knex('profiles')
    .where('user_id', request.body.user_id)
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

  if (body.nickname === undefined) {
    return response.status(400).json({ error: "Nimerkki puuttui!" });
  }
  if (body.username.length < 3) {
    return response
      .status(400)
      .json({ error: "Nimimerkin pitää olla ainakin 3 merkin pituisia!" });
  }

  const newProfile = {
    'nickname': body.nickname,
    'age': body.age,
    'profiletext': body.profiletext,
    'user_id': body.user_id
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

exports.deleteProfile = async (request, response) => {
  knex('profiles')
    .where('id', request.body.id)  
    .del()
    .then(message => {
      if (message === 1) {
        return response.status(200).json(`Poisto onnistui`)
      } else {
        return response.status(404).json(`Poisto ei onnistunut`)
      }
    })
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
}


//TODO: add a route for modifying own profile

