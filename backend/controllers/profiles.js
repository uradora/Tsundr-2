const knex = require('./../db/db.js')
const profilesRouter = require('express').Router()

profilesRouter.get('/', async (request, response) => {
  knex
    .select('*')
    .from('profiles')
    .then(profileData => {
      response.json(profileData)
    })
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
})

profilesRouter.get('/:id', async (request, response) => {
  console.log(request.body)
  knex('profiles')
    .where('id', request.params.id)  
    .then((profile) => {
      if (profile) {
        response.json(profile)
      } else {
        response.status(404).end()
      }})
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
})

profilesRouter.get('/byuserid/:user_id', async (request, response) => {
  knex('profiles')
    .where('user_id', request.params.user_id)
    .then((profile) => {
      if (profile) {
        response.json(profile)
      } else {
        response.status(404).end()
      }})
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
})

profilesRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.nickname === undefined) {
    return response.status(400).json({ error: "Nimerkki puuttui!" });
  }
  if (body.nickname.length < 3) {
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
})

profilesRouter.delete('/:id', async (request, response) => {
  knex('profiles')
    .where('id', request.params.id)  
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
})


//TODO: add a route for modifying own profile

module.exports = profilesRouter

