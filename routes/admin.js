const express = require('express')
const router = express.Router()
const AdminBookController = require('../controllers/admin/bookController')
const AdminUserController = require('../controllers/admin/userController')

router.post('/book', AdminBookController.createBook)
router.patch('/book/add-stocks', AdminBookController.addStocks)

router.get('/user/book-log', AdminUserController.getAllUserInBookLog)
module.exports = router