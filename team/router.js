// import Router class from express
const {Router} = require('express')
// import model
const Team = require('./model')
const Player = require('../player/model')
//import auth middleware
const auth = require('../server/auth/middleware')
// instanciate router
const router = new Router()
// register a get /teams route
router.get('/teams',
    (req, res, next) => {
        // find all teams
        Team.findAll()
            .then( teams => {
                // send result in response body
                res.send(teams)
            })
            .catch(next)
    }
)
// add a post /teams endpoint
router.post('/teams', auth, 
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
router.delete('/teams/:id', auth,
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
            .then((number) => {
                res.send({id:Number(req.params.id)}).status(401).end()
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
// export router to use in index.js
module.exports = router