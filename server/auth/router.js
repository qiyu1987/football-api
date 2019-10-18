const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

router.post('/login', (req, res, next) => {
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(!req.body.email || !req.body.password)
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    }
    // normally we would check the password and find the correct user in the database
    res.send({
        jwt: toJWT({ userId: 1 })
    })
})
// define endpoints here
module.exports = router