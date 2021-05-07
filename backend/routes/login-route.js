const express = require('express')
const loginRoutes = require('./../controllers/login.js')
const router = express.Router()

router.post('/login', loginRoutes.login)

module.exports = router