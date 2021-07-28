const express = require('express')
const logger = require("./utilities/logger")
const { config } = require('./config')

let app = express()

//routes definition
let campaigns = require('./campaigns/routes.js')

//define all the routes here
app.use('/campaigns', campaigns)

app.listen(config.PORT, () => {
  logger.info(`Listenig on Port ${config.PORT}`)
})
