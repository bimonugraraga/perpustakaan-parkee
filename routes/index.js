const express = require('express');
const route = express();
const adminRoute = require('./admin')
const userRoute = require('./user')
const guestRoute = require('./guest')

route.use('/admin', adminRoute)
route.use('/user', userRoute)
route.use('/guest', guestRoute)

module.exports = route