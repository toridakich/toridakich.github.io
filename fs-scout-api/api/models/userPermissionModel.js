var mysqlConn = require("../database");

var UserPermission = function(userPermission){
    this.user_id = userPermission.user_id;
    this.parent_id = userPermission.parent_id;
}

UserPermission.getAreaIds = (result) =>{
    mysqlConn.query("SELECT * FROM user.user_permission", function(err, res) {

        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        result(null, res);
        }
    });
}

module.exports = UserPermission;