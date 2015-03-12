var models = require('cloud/models/_models');

var Ticker = Parse.Object.extend('Ticker',
  // instance methods
  {
  },
  // class methods
  {
      get: function(keyValues) {
          return models.get(Ticker, 'Ticker', keyValues);
      },

      getGlassdoorData: function(companyName) {
        return Parse.Cloud.httpRequest({
          method: "GET",
          url: "http://api.glassdoor.com/api/api.htm",
          params: {
              "v": 1,
              "t.p": 31415,
              "t.k": "fegPisJ2bhs",
              "userip": "0.0.0.0",
              "format": "json",
              "action": "employers",
              "q": companyName
          }
        });
      },

      toObject: function(list) {
          return internal.toObject(list, allFields);
      },
      list: function() {
          var rtn = new Parse.Promise(),
              tickers = new Parse.Query(Ticker);

          tickers.find().then(
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

exports.Ticker = Ticker;