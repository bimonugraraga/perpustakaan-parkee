const express = require('express')
const router = express.Router()
const GuestController = require('../controllers/guestController')

router.get('/book', GuestController.getAllBook)
router.get('/book/:book_id', GuestController.getOneBook)
module.exports = router