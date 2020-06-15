
var mysqlConn = require("../database");

var User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.scout_type = user.scout_type;
}

module.exports = User;