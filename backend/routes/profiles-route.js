const express = require('express')
const profilesRoutes = require('./../controllers/profiles.js')
const router = express.Router()

router.get('/all', profilesRoutes.getAll)

router.get('/one', profilesRoutes.getProfile)

router.get('/byuserid', profilesRoutes.getByUserId)

router.post('/create', profilesRoutes.createProfile)

module.exports = router
