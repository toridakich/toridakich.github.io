
var mysqlConn = require("../database");

var Player = function(player){
    this.first_name = player.first_name;
    this.last_name = player.last_name;
    this.school_id = player.school_id;
    this.height = player.height;
    this.weight = player.weight;
    this.position = player.position;
}

Player.findAllPlayers = function(result){
    
    mysqlConn.query("Select * from user.player", function(err, res) {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res);
        result(null, res);
        }
    });
};

Player.addNewPlayer = (newPlayer, result) => {
    mysqlConn.query("INSERT INTO user.player set ?", newPlayer, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
module.exports = Player;