const {Router} = require('express')
const bcrypt = require('bcrypt')
const router = new Router()
const User = require('./model')
router.post('/user',
    (req, res, next) => {
        const user = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        User.create(user)
            .then(user => res.send(user))
            .catch(next)
    }
)
module.exports = router