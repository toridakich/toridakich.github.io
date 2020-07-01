const UserPermission = require('../models/userPermissionModel');

module.exports = class userPermissionController{
    constructor(){}

    getAreaScoutIds(parentId){
        return new Promise((resolve, reject) => {
            var found = false;
            UserPermission.getAreaIds((err, dbPerms) =>{
              if(err) reject(err);
              let dbPerm = dbPerms.filter(dbPerm =>{
                return dbPerm.parent_id == parentId;
              });
              if(dbPerm.length){
                    var ids = [];
                    for(var i = 0; i < dbPerm.length; i++){
                        ids.push(dbPerm[i].user_id);
                    }
                  resolve(ids);
                
              }else{
                reject("No area scouts found");
              }
            });
           
          });
    }
}