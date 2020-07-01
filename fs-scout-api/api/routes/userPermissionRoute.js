const express = require('express');
const router = express.Router();

const UserPermissionController = require('../controllers/userPermissionController');
const userPermissionController = new UserPermissionController();

router.post('/getAreaScoutIds', (req, res) =>{
    
    userPermissionController.getAreaScoutIds(req.body.user_id)
    .then(ids =>{
        res.send(ids);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
})

module.exports = router;