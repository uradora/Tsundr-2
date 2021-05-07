const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const profilesRouter = require('./routes/profiles-route')
const usersRouter = require('./routes/users-route')
const loginRouter = require('./routes/login-route')
const config = require('./utils/config')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/profiles', profilesRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

/*app.use(function (err, req, res) {
  console.error(err.stack)
  res.status(500).send('Server error')
})

app.use(function (req, res) {
  res.status(404).send('Page not found!')
})*/

const PORT = config.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
