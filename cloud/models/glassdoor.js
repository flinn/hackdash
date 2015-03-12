var models = require('cloud/models/_models');

var Glassdoor = Parse.Object.extend('Glassdoor',
  // instance methods
  {
  },
  // class methods
  {
      get: function(keyValues) {
          return models.get(Glassdoor, 'Glassdoor', keyValues);
      },

      create: function(item) {
        var newRating = new Glassdoor();
        return newRating.save({
          'ticker': item.ticker,
          'result': item.info
        });
      },

      toObject: function(list) {
          return internal.toObject(list, allFields);
      },
      list: function() {
          var rtn = new Parse.Promise(),
              Glassdoors = new Parse.Query(Glassdoor);

          Glassdoors.find().then(
            function(results) {
              rtn.resolve(results);
            }, function(err) {
              rtn.reject(err);
            }
          );

          return rtn;
      }
  }
);

exports.Glassdoor = Glassdoor;