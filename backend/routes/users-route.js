const express = require('express')
const userRoutes = require('./../controllers/users.js')
const router = express.Router()

router.get('/all', userRoutes.getAll)

router.get('/one', userRoutes.getUser)

router.post('/create', userRoutes.createUser)

module.exports = router