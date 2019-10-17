const express = require('express')
const db = require('./db')
const teamRouter = require('./team/router')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const playerRouter = require('./player/router')
const port = process.env.PORT || 4000
app.use(jsonParser)
app.use(teamRouter)
app.use(playerRouter)

app.listen(port, () => console.log(`Listening on Port ${port}`))