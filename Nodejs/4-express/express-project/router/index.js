const express = require('express')

const router = express.Router()

router.use('/users',require('./user'))
router.use('/videos',require('./video'))

module.exports = router