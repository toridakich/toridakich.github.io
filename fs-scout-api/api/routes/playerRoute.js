const express = require('express');
const router = express.Router();

const PlayerController = require('../controllers/playerController');
const playerController = new PlayerController();

router.get("/getAllPlayers", (req, res)=>{
    playerController.getAllPlayers(req.body)
    .then(players =>{
        res.send(players);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
})

router.post("/addNewPlayer", (req, res)=>{
    playerController.addNewPlayer(req.body)
    .then(player =>{
        res.sendStatus(player);
    })
    .catch(err =>{
        res.status(400).send(err);
    })
})


module.exports = router;