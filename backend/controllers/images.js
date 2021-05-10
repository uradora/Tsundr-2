const knex = require('./../db/db.js')
const imagesRouter = require('express').Router()
const multer = require('multer')
const { request, response } = require('express')
const path = require('path')

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, 'resources')
    },
    filename: function (request, file, cb) {
      cb(
        null,
        new Date().valueOf() + '_' + file.originalname
      )
    }
  })
})

imagesRouter.get('/', async (request, response) => {
  knex('images')
    .select('*')
    .from('images')
    .then(imageData => {
      response.json(imageData)
    })
    .catch(err => {
      response.json({ message: `Error: ${err}` })
    })
})

imagesRouter.post('/upload', imageUpload.single('image'), (request, response) => {
  console.log(request)
  const { filename, mimetype, size } = request.file
  const filepath = request.file.path

  const newImage = {
    'filename': filename,
    'filepath': filepath,
    'mimetype': mimetype,
    'size': size
  }

  knex('images')
    .insert(newImage)
    .then(() => 
    response
      .status(200)
      .json(`Kuvan ${filename} lisääminen onnistui`))
    .catch((err) => {
      response
        .status(400)
        .json(`Kuvan ${filename} lisääminen ei onnistunut: ${err}`)
    })

})

imagesRouter.get('/:filename', (request, response) => {
  const { filename } = request.params

  knex('images')
    .select('*')
    .where({filename})
    .then((images) => {
      if (images[0]) {
        const dirname = path.resolve()
        const fullfilepath = path.join(
          dirname, images[0].filepath)
        return response
          .type(images[0].mimetype)
          .sendFile(fullfilepath)
      }
      return Promise.reject(
        new Error('Kuvaa ei ole olemassa')
      )
    })
    .catch((err) => response
      .status(404).json('Ei löytynyt'))
})


module.exports = imagesRouter