const express = require('express');
const route = express();
const adminRoute = require('./admin')
const userRoute = require('./user')

route.use('/admin', adminRoute)
route.use('/user', userRoute)

module.exports = route