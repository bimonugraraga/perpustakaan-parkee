const express = require('express');
const route = express();
const userRoute = require('./user')

route.use('/user', userRoute)

module.exports = route