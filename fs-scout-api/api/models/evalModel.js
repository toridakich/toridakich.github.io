var mysqlConn = require("../database");

var Eval = function(eval){
    this.evaluation_id = eval.evaluation_id;
    this.date = eval.date;
    this.location = eval.location;
    this.event_type = eval.event_type;
    this.grade = eval.grade;
    this.notes = eval.notes;
    this.user_id = eval.user_id;
    this.first_name = eval.first_name;
    this.last_name = eval.last_name;
    this.school_id = eval.school_id;
    this.height = eval.height;
    this.weight = eval.weight;
    this.position = eval.position;
    this.writer = eval.writer;
}

Eval.findAllEvals = function(result){
    mysqlConn.query("SELECT * FROM user.evaluation", function(err, res) {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        result(null, res);
        }
    });
    
};

Eval.findEvalsByUserId = function(userId){
    return new Promise((resolve, reject)=>{
        
        mysqlConn.query("Select * from user.evaluation where user_id=?", userId, (err,res)=>{
            if(err){
                reject(err);
            }else{
                console.log({"res":res});
                resolve(res);
            }
        })
    })
};

Eval.createEvals = function(newEval, result){
   
    mysqlConn.query("INSERT INTO user.evaluation set ?", newEval, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res.insertId);
        result(null, res.insertId);
        }
    });
};


module.exports = Eval;