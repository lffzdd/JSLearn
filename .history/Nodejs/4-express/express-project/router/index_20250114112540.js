const express = require('express')

const router = express.Router()

router.use('/video',require('./video'))
router.use('/user',require('./video'))

module.exports = router