const {Router} = require('express')
const Player = require('./model')
const router = new Router()
router.get('/player',
    (req, res, next) => {
        Player.findAll()
            .then( players => {
                res.send(players)
            })
            .catch(next)
    }
)
router.post('/player',
    (req, res, next) => {
        if (!req.body) {
            res.status(404).end()
        }
        Player.create(req.body)
            .then(player => res.send(player))
            .catch(next) 
    }
)
router.get('/player/:id',
    (req, res, next) => {
        Player.findByPk(req.params.id)
            .then( player => {
                if (!player) {
                    res.status(404).end()
                }
                res.send(player)
            })
            .catch(next)
    })

module.exports = router