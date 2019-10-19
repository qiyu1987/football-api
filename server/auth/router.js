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
router.get('/secret-endpoint', (req, res) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      try {
        const data = toData(auth[1])
        res.send({
          message: 'Thanks for visiting the secret endpoint.',
          data
        })
      }
      catch(error) {
        res.status(400).send({
          message: `Error ${error.name}: ${error.message}`,
        })
      }
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
  })
// define endpoints here
module.exports = router