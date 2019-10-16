const {Router} = require('express')
const Team = require('./model')
const router = new Router()
router.get('/team',
    (req, res, next) => {
        Team.findAll()
            .then( teams => {
                res.send(teams)
            })
            .catch(next)
    }
)
router.post('/team',
    (req, res, next) => {
        if (!req.body) {
            res.status(404).end()
        }
        Team.create(req.body)
            .then(team => res.send(team))
            .catch(next) 
    }
)
router.get('/team/:id',
    (req, res, next) => {
        Team.findByPk(req.params.id)
            .then( team => {
                if (!team) {
                    res.status(404).end()
                }
                res.send(team)
            })
            .catch(next)
    })

module.exports = router