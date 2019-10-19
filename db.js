// import sequelize nodejs library for ORM
const Sequelize = require('sequelize')
// connect to local postgres database or pass through env
const databaseUrl = process.env.DATABASE_URL
    ||'postgres://postgres:secret@localhost:5432/postgres'
// db as a new instance of Sequelize connect to the databaseUrl
const db = new Sequelize(databaseUrl)
// export db to use in index.js
module.exports = db