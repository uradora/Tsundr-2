const knex = require('./../db/db.js')

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

  if (body.username === undefined) {
    return response.status(400).json({ error: "Missing required field!" });
  }
  if (body.username.length < 3) {
    return response
      .status(400)
      .json({ error: "Username must be at least 3 characters long!" });
  }
  //TODO: add condition validating if username already exists

  const newProfile = {
    'username': body.username,
    'age': body.age,
    'profiletext': body.profiletext
  }
  
  knex('profiles')
    .insert(newProfile)
    .then(() => {
      response.json(`Success adding profile with name ${body.username}`)
    })
    .catch(err => {
      return response
      .status(400)
      .json({ message: `Error: ${err}` })
    })
}

//TODO: add a route for modifying own profile

