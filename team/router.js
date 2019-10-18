const {Router} = require('express')
const Team = require('./model')
const Player = require('../player/model')
const router = new Router()
router.get('/teams',
    (req, res, next) => {
        Team.findAll()
            .then( teams => {
                res.send(teams)
            })
            .catch(next)
    }
)
router.post('/teams',
    (req, res, next) => {
        if (!req.body) {
            res.status(404).end()
        }
        Team.create(req.body)
            .then(team => res.send(team))
            .catch(next) 
    }
)
router.get('/teams/:id',
    (req, res, next) => {
        Team.findByPk(req.params.id, {include:[Player]})
            .then( team => {
                if (!team) {
                    res.status(404).end()
                }
                res.send(team)
            })
            .catch(next)
})
router.delete('/teams/:id',
    (req, res, next) => {
        Team.findByPk(req.params.id)
            .then( team => {
                if (!team) {
                    res.status(404).end()
                }
            })
        Team.destroy({
            where: {
                id: req.params.id,
            }
            })
            .then((id) => {
                res.send({id}).status(401).end()
            })
            .catch(next);
    }
)
router.put('/teams/:id',
    (req, res, next) => {
        Team.findByPk(req.params.id)
        .then( team => {
            if (!team) {
                res.status(404).end()
            }
            else {
                team
                .update(req.body)
                .then(team => res.json(team));
            }
        })
        .catch(next)
    }
)

module.exports = router