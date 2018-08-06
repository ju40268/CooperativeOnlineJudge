var problemModel = require('../models/problemModel')
var getProblems = function() {
    return new Promise((resolve, reject) => {
        problemModel.find({}, function (err, problems) {
            if (err) reject();
            else resolve(problems);
        });
    });
}

var findSingleProblem = function (id) {
    return new Promise((resolve,reject) => {
      problemModel.findOne({ id: id }, function (err, problem) {
        if (err) reject(err);
        else resolve(problem);
      });
    });
  }

var addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
        problemModel.findOne({name : newProblem.name}, function (err, problem) {
            if (problem) reject("Duplicate problem name.");
            else {
                problemModel.count({}, function(err, num) {
                    newProblem.id = num + 1;
                    var mongoRecord = new problemModel(newProblem);
                    mongoRecord.save();
                    resolve(newProblem);
                });
            }
        });
    });

}

module.exports = {
    getProblems : getProblems,
    findSingleProblem : findSingleProblem,
    addProblem : addProblem
}