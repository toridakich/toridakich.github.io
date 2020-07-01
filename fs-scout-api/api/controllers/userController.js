const User = require('../models/userModel');

module.exports = class userController{
    constructor(){}
    userLogin(user) {
        return new Promise((resolve, reject) => {
          var found = false;
          User.findAllUsers((err, dbUsers) =>{
            if(err) reject(err);
            let dbUser = dbUsers.filter(dbUser =>{
              return dbUser.email == user.email;
            });
            if(dbUser.length){
              if(dbUser[0].password != user.password){
                reject("Incorrect password");
              } 
              else {
                resolve(dbUser[0]);
              }
            }else{
              reject("User not found");
            }
          });
          
        });
      }
      getUserByName(user){
        return new Promise((resolve, reject) => {
            var found = false;
            User.findAllUsers((err, dbUsers) =>{
              if(err) reject(err);
              let dbUser = dbUsers.filter(dbUser =>{
                return dbUser.email == user.email;
              });
              if(dbUser.length){
                
                  resolve(dbUser[0]);
                
              }else{
                reject("User not found");
              }
            });
           
          });
      }
      getUserByUserId(user){
        return new Promise((resolve, reject) => {
            var found = false;
            User.findAllUsers((err, dbUsers) =>{
              if(err) reject(err);
              let dbUser = dbUsers.filter(dbUser =>{
                return dbUser.user_id == user;
              });
              if(dbUser.length){
                
                  resolve(dbUser[0]);
                
              }else{
                reject("User not found");
              }
            });
           
          });
      }

}