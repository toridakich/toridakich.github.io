const express = require('express');
const router = express.Router();

const EvalController = require('../controllers/evalController');
const evalController = new EvalController();

router.get('/', (req,res)=>{
    evalController.getAllEvals(req.body)
    .then(evals =>{
        res.send(evals);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

router.post('/getForAreaScout', (req, res) =>{
    
    evalController.listEvalsWithUserId(req.body)
    .then(evals =>{
        res.send(evals);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

router.post('/createNew', (req, res) =>{
    evalController.createNewEval(req.body)
    .then(evaluation =>{
        res.json(evaluation);
    })
    .catch(err =>{
        res.status(400).json({ msg: err.message });
    });
});

router.delete('/deleteEval', (req, res) =>{
    evalController.deleteEval(req.body.evaluation_id)
    .then(evaluation =>{
        res.json(evaluation)
    })
    .catch(err =>{
        res.status(400).json({ msg: err.message });
    });
})

router.patch('/updateEval', (req, res) =>{
    evalController.updateEvaluation(req.body)
    .then(evaluation =>{
        res.json(evaluation)
    })
    .catch(err =>{
        res.status.json({ msg: err.message });
    })
})

module.exports = router;