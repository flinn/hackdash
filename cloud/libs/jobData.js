var _ = require('underscore'),
    internal = require('cloud/libs/_internal.js');

var dataFields = [
        'api_key',
        'lastRun',
        'url'
    ],
    allFields = _.union(dataFields, ['jobName']);

var JobData = Parse.Object.extend('JobData',
    // instance methods
    {

    },
    //class
    {
        createOrUpdate: function(jobName, keyValues) {

            return internal.upsert(JobData, 'JobData', 'jobName', dataFields, jobName, keyValues, function() {
                var obj = new JobData();
                obj.set('jobName', jobName);
                return obj;
            });

        },

        update: function(jobName, keyValues) {
            return internal.upsert(JobData, 'JobData', 'jobName', dataFields, jobName, keyValues, function() {
                promise.reject('JobData (' + jobName + ') not found');
                return false;
            });

        },

        massCreateOrUpdate: function(objects) {

            var promises = [];
            _.each(objects, function(object) {
                promises.push(JobData.createOrUpdate(object.jobName, object));
            });

            return Parse.Promise.when(promises);
        },

        get: function(keyValues) {
            return internal.get(JobData, 'JobData', keyValues);
        },

        toObject: function(list) {
            return internal.toObject(list, allFields);
        }
    }
);

exports.JobData = JobData;