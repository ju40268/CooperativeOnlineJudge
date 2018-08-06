var express = require("express");
var router = express.Router();
var problemService = require("../service/problemService");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


router.get("/problems", function (req, res) {
    problemService.getProblems()
      .then(problems => res.json(problems));
});
router.get('/problems/:id', function (req, res) {
    var targetId = req.params.id;
    problemService.findSingleProblem(+targetId)
    .then(targetProblem => res.json(targetProblem));
});

router.post('/problems', jsonParser, function (req, res) {
    problemService.addProblem(req.body).then(function(problem) {
        res.json(problem)
    }, function(error) {
        res.status(400).send("Problem name already exist!");
    });
});
module.exports = router;