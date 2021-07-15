const express = require('express')
const router = express.Router()

// Load Controllers
const {
    initController,
    stockController
} = require('../controllers/tiingo.controller')

router.get('/init', initController);
router.get('/stock', stockController);

module.exports = router