const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const profilesRouter = require('./routes/profiles-route')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/profiles', profilesRouter)

//TODO: implement these in middleware, keep for now
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Server error')
})

app.use(function (req, res, next) {
  res.status(404).send('Page not found!')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
