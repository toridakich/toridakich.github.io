const Eval = require('../models/evalModel');

module.exports = class evalController{
    constructor(){}

    getAllEvals(){
        return new Promise((resolve, reject)=>{
            
            Eval.findAllEvals((err, dbEvals) =>{
                if(err){
                    reject(err);
                } 
                resolve(dbEvals);
            })
        })
    }

    listEvalsWithUserId(userId){
        
        return new Promise((resolve, reject) => {
            var found = false;
            Eval.findAllEvals((err, dbEvals) =>{
              if(err) reject(err);
              let dbEval = dbEvals.filter(dbEval =>{
                return dbEval.user_id == userId.user_id;
              });
              if(dbEval.length){
                
                  resolve(dbEval);
                
              }else{
                reject("No evaluations found");
              }
            });
           
          });
    }
    createNewEval(evaluation){
        return new Promise((resolve, reject) =>{
            const evalObj = {
                evaluation_id: evaluation.evaluation_id,
                date: evaluation.date,
                location: evaluation.location,
                event_type: evaluation.event_type,
                grade: evaluation.grade,
                notes:evaluation.notes,
                user_id: evaluation.user_id,
                first_name: evaluation.first_name,
                last_name: evaluation.last_name,
                school_id: evaluation.school_id,
                height: evaluation.height,
                weight: evaluation.weight,
                position: evaluation.position,
                writer: evaluation.writer
            };
            console.log("hey");
            console.log(evalObj);
            const newEvaluation = new Eval(evalObj);

            Eval.createEvals(newEvaluation, (err, res) =>{
                if(err) reject(err);
                resolve(res);
            })

        })
    }

}