var _ = require('underscore'),
    libs = require('cloud/libs/_libs.js');

function runImport(jobId, status, makeRequestCB, processCB) {
    var func = '',
        lastRun;

    console.log('-- Begin --');
    console.log('Job:' + jobId);

    queryJob()
        .then(makeRequest)
        .then(recordRun)
        .then(process)
        .then(updateJob)
        .then(signalSuccess)
        .fail(handleError);

    function handleError(err) {
        var errMsg;
        var fmt = func + ': ' + JSON.stringify(err);

        if (fmt.length > 10000) {
            errMsg = fmt.substring(0, 10000);
        } else {
            errMsg = fmt;
        }

        console.log(fmt);
        status.error(errMsg);
    }

    function queryJob() {
        console.log('queryJob');
        func = 'queryJob';

        return libs.JobData.get({
            jobName: jobId
        });
    }

    function makeRequest(job) {
        console.log('makeRequest using CB');
        func = 'makeRequest';
        return makeRequestCB(job);
    }

    function recordRun(httpResponse) {
        func = 'recordRun';
        lastRun = new Date();
        return Parse.Promise.as(httpResponse);
    }

    function process(httpResponse) {
        console.log('processing using CB');
        func = 'process';
        return processCB(httpResponse);
    }

    function updateJob() {
        console.log('updateLastRun');
        func = 'updateJob';

        return libs.JobData.update(jobId, {
            lastRun: lastRun
        });
    }

    function signalSuccess() {
        console.log('-- End --');
        func = 'signalSuccess';
        status.success();
    }

}

exports.runImport = runImport;