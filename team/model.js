// create Team model database Schema
const Sequelize = require('sequelize')
const db = require('../db')
// declare model
const Team = db.define(
    // 1. argument model name
    'team',
    // 2. argument with one field 'name', the datatype is string
    { name:Sequelize.STRING },
    // 3. optional argument desable timestamps -- createAt, updateAt
    {timestamps: false}
    )
// export Team model
module.exports = Team