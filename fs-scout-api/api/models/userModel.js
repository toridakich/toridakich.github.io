
var mysqlConn = require("../database");

var User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.scout_type = user.scout_type;
}
User.findAllUsers = function(result) {
  
    mysqlConn.query("SELECT * FROM user.user", function(err, res) {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        result(null, res);
        }
    });
  };

 

module.exports = User;