const {Router} = require('express')
const bcrypt = require('bcrypt')
const router = new Router()
const User = require('./model')
router.post('/user',
    (req, res, next) => {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            res.status(400).send({
              message: 'Please supply a valid email and password'
            })
        }
        const user = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        User.create(user)
            .then(user => res.json(user))
            .catch(next)
    }
)
module.exports = router