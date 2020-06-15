const Player = require('../models/playerModel.js');

module.exports = class PlayerController{
    constructor(){}
    
    getAllPlayers(){
        return new Promise((resolve, reject)=>{
            
            Player.findAllPlayers((err, dbUsers) =>{
                if(err){
                    reject(err);
                } 
                resolve(dbUsers);
            })
        })
    }

    addNewPlayer(player){
        return new Promise((resolve, reject) =>{
            const playerObj = {
                player_id: player.player_id,
                first_name: player.first_name,
                last_name: player.last_name,
                school_id: player.school_id,
                height: player.height,
                weight: player.weight,
                position: player.position
            };

            const newPlayer = new Player(playerObj);
            Player.addNewPlayer(newPlayer, (err, res) =>{
                if (err) reject(err);
                resolve(res);
            })

        })
    }
}