//Model export list
exports.Ticker = require('cloud/models/ticker.js').Ticker;
exports.Glassdoor = require('cloud/models/glassdoor.js').Glassdoor;

//Shared Model Methods...
var _ = require('underscore');

function toObject(list, fields) {
    function project(i) {
        var rtn = {};
        _.each(fields, function(f) {
            rtn[f] = i.get(f);
        });
        return rtn;
    }

    if (_.isArray(list))
        return _.map(list, project);

    return project(list);
}

function upsert(objectType, objectName, pkName, dataFields, pkValue, keyValues, notFoundCB) {
    Parse.Cloud.useMasterKey();

    var rtn = new Parse.Promise(),
        query = new Parse.Query(objectType),
        allowedValues = _.pick(keyValues, dataFields);

    query.equalTo(pkName, pkValue);
    query.first()
        .then(
        function(obj) {

            if (typeof(obj) != 'object') {
                var rtnCB = notFoundCB(rtn);
                if (typeof(rtnCB) == 'boolean' && !rtnCB) {
                    return;
                }
                obj = rtnCB;
            }

            _.each(allowedValues, function(v, k) {
                if (v === undefined)
                    obj.unset(k);
                else
                    obj.set(k, v);
            });

            return obj.save();
        }
    ).then(
        function(obj) {
            rtn.resolve(obj);
        }
    ).fail(
        function(err) {
            rtn.reject(objectName + ' (' + pkValue + ') ' + JSON.stringify(err));
        }
    );

    return rtn;
}

function get(objectType, objectName, keyValues) {
    Parse.Cloud.useMasterKey();

    var query = new Parse.Query(objectType),
        rtn = new Parse.Promise();

    _.each(keyValues, function(v, k) {
        if (_.isArray(v))
            query.containedIn(k, v);
        else
            query.equalTo(k, v);
    });

    query.first()
        .then(
        function(obj) {
            if (typeof(obj) != 'object') {
                rtn.reject(objectName + ' not found.');
                return;
            }
            rtn.resolve(obj);
        },
        function(err) {
            rtn.reject(JSON.stringify(err));
        }
    );

    return rtn;
}

exports.toObject = toObject;
exports.upsert = upsert;
exports.get = get;