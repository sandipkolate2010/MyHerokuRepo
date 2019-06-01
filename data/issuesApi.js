"use strict";

var issues = require('../data/issueData').issues;
var _ = require('lodash');

var currentID = 4;
var _clone = function (item) {
    return item;
};

var IssuesApi = {
    getAllIssues: function (callback) {
      console.log('1111issueapi');
        callback(null, _clone(issues));
    },
    getIssueById: function (id, callback) {
        var issue = _.find(issues, { id: parseInt(id) });
        callback(null, _clone(issue));
    },
    updateIssueById: function (id, issue, callback) {
        var existingIssueIndex = _.indexOf(issues, _.find(issues, { id: parseInt(id) }));
        issue.id = parseInt(id);
        issues.splice(existingIssueIndex, 1, issue);
        callback(null);
    },
    saveIssue: function (issue, callback) {
        currentID = currentID + 1;
        issue.id = currentID;
        issues.push(issue);
        callback(null, _clone(issue));
    },
    deleteIssueById: function (id, callback) {
        _.remove(issues, { id: parseInt(id) });
        callback(null);
    }
};

module.exports = IssuesApi;
