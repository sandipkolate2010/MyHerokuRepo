var express = require('express');
var router = express.Router();
issues = require('./data/issuedata');
issuesApi = require('./data/issuesApi');

router.get('/getAllIssues', function (req, res, next) {
  console.log("test...");
  return {"issueid": 2};
  // issuesApi.getAllIssues(function (err, items) {
  //   res.send(items);
  // });
});

router.post('/addIssue', function (req, res, next) {
  var issue = {};
  issue.Description = req.body.Description;
  issue.Severity = req.body.Severity;
  issue.Status = req.body.Status;
  issue.CreatedDate = req.body.CreatedDate;
  issue.ResolvedDate = req.body.ResolvedDate;
  issuesApi.saveIssue(issue, function(err, issue) {
	  issuesApi.getAllIssues(function (err, items) {
      res.send(items);
    });
  });
});

router.get('/getIssueById/:id', function (req, res, next) {
  issuesApi.getIssueById(req.params.id, function (err, item) {
    res.send(item);
  });
});

router.put('/updateIssueById/:id', function (req, res, next) {
  var updatedIssue = {};
  updatedIssue.Description = req.body.Description;
  updatedIssue.Severity = req.body.Severity;
  updatedIssue.Status = req.body.Status;
  updatedIssue.CreatedDate = req.body.CreatedDate;
  updatedIssue.ResolvedDate = req.body.ResolvedDate;
  issuesApi.updateIssueById(req.params.id, updatedIssue, function(err) {
    issuesApi.getAllIssues(function (err, items) {
      res.send(items);
    });
  });
});

router.get('/deleteIssueById/:id', function (req, res, next) {
  issuesApi.deleteIssueById(req.params.id, function(err) {
    issuesApi.getAllIssues(function (err, items) {
      res.send(items);
    });
  });
});

module.exports = router;
