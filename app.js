if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const params = require('strong-params')
const errHandle = require('./helper/errorhandler')
const route = require('./routes/index')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(params.expressMiddleware())

app.get("/", (req, res, next) => {
  res.send("Hello World")
})

app.use('/v1', route)
app.use(errHandle)

app.listen(port, () => {
 console.log(`Listen on http://localhost:${port}`);
});