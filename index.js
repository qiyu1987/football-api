// import express nodejs library to create server app
const express = require('express')
// import database sequelize instance
const db = require('./db')
// import teamRouter router,
const Team = require('./team/model')
const Player = require('./player/model')
const User = require('./user/model')
const userRouter = require('./user/router')
const teamRouter = require('./team/router')
const playerRouter = require('./player/router')
const loginRouter = require('./server/auth/router')
const app = express()
//import bodyParser middleware to parse request body as json and use in
//request handeling
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const port = process.env.PORT || 4000
// import cors Cross Origin Sharing middleware from nodejs library cors 
const cors = require('cors')
const middleware = cors()
// call db sync method,
// use {force: true} argument to reset database when start API
// easier to test during development
db.sync()
    .then(() => {
        // console.log confirmation database is connected
        console.log('database schema updated')

        const teamNames = ['Egel', 'Das', 'Eagle', 'Pinguin']
    
        const teams = teamNames.map(teamName => Team.create({ name: teamName}))
        return Promise.all(teams)
    })
    .then(() => {
        const players = [
            { name: 'Mimi', number: 4, teamId: 1},
            { name: 'Wouter', number: 1, teamId: 2},
            { name: 'David', number: 9, teamId: 3},
            { name: 'Bram', number: 8, teamId: 4},
            { name: 'Lisa', number: 10, teamId: 1},
            { name: 'Miloud', number: 2, teamId: 2},
            { name: 'Violeta', number: 3, teamId: 3},
            { name: 'Johan', number: 5, teamId: 4},
            { name: 'Danny', number: 6, teamId: 3},
            { name: 'Rembert', number: 7, teamId: 2},
            { name: 'Kelley', number: 10, teamId: 1},
            { name: 'Jeroen', number: 12, teamId: 4},
            { name: 'Rein', number: 11, teamId: 2},
        ]

        const playerPromises = players.map((player) => Player.create(player))
        return Promise.all(playerPromises)
    })    
    .catch(console.error)
// regist both cors and body-parser middleware before router
app.use(middleware)
app.use(jsonParser)
// register teamRouter with app.use
app.use(teamRouter)
app.use(playerRouter)
app.use(loginRouter)
app.use(userRouter)

app.listen(port, () => console.log(`Listening on Port ${port}`))