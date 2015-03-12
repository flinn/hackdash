var _ = require('underscore'),
    libs = require('cloud/libs/_libs.js'),
    shared = require('cloud/jobs/_shared.js');

var jobName = 'importDailyData';

Parse.Cloud.job(jobName, function(request, status) {

    function apiCall(job) {
    	console.log("Making API call...");
    }

    function processRecords(httpResponse) {
    	console.log("processing records...");
    }

    shared.runImport(jobName, status, apiCall, processRecords);
});