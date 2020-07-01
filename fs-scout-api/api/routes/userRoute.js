const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')
const userController = new UserController();

router.post("/userLogin", (req, res) => {
    userController.userLogin(req.body)
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  
  });

  router.post('/getUserByEmail', (req, res) =>{
     
      userController.getUserByName(req.body)
      .then(user =>{
          
          res.send(user);
      })
      .catch(err =>{
          res.status(400).send(err);
      })
  });

  router.post('/getUserByUserId', (req, res) =>{
     
    userController.getUserByUserId(req.body.user_id)
    .then(user =>{
        
        res.send(user);
    })
    .catch(err =>{
        res.status(400).send(err);
    })
});

  module.exports = router;