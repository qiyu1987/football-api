const {Router} = require('express')
const Player = require('./model')
const Team = require('../team/model')
const router = new Router()
router.get('/players',
    (req, res, next) => {
        Player.findAll()
            .then( players => {
                res.send(players)
            })
            .catch(next)
    }
)
router.post('/players',
    (req, res, next) => {
        if (!req.body) {
            res.status(404).end()
        }
        Player.create(req.body)
            .then(player => res.send(player))
            .catch(next) 
    }
)
router.get('/players/:id',
    (req, res, next) => {
        Player.findByPk(req.params.id, {include: [Team]})
            .then( player => {
                if (!player) {
                    res.status(404).end()
                }
                res.send(player)
            })
            .catch(next)
    })
router.delete('/players/:id',
    (req, res, next) => {
        Player.findByPk(req.params.id)
        .then( player => {
            if (!player) {
                res.status(404).end()
            }
        })
    Player.destroy({
        where: {
            id: req.params.id,
        }
        })
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
    }
)
router.put('/players/:id',
    (req, res, next) => {
        Player.findOne({
            where: {
              id: req.params.id,
            }
          })
            .then(player => {
              if (player) {
                player
                  .update(req.body)
                  .then(player => res.json(player));
              } else {
                res.status(404).end();
              }
            })
            .catch(next);
    }
)
module.exports = router