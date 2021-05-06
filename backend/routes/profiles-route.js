const express = require('express')
const profilesRoutes = require('./../controllers/profiles.js')
const router = express.Router()

router.get('/', profilesRoutes.getAll)

router.get(':id', profilesRoutes.getProfile)

router.post('/', profilesRoutes.createProfile)

module.exports = router
