var _ = require('underscore');
var models = require('cloud/models/_models.js');

Parse.Cloud.job('glassdoorImport', function(request, status) {
    getGlassdoorDataForTickers()
      .then(saveGlassdoorItems)
      .then(function() {
        successfulImport(status);
      })
      .fail(importFailure);
});



function getGlassdoorDataForTickers() {
  var rtn = new Parse.Promise();

  var query = new Parse.Query(models.Ticker);
  query.find().then(function(tickers) {
    var promises = [];
    _.each(tickers, function(ticker) {
      console.log(ticker);
      promises.push(getGlassdoorData(ticker));
    });
    return Parse.Promise.when(promises);
  }).then(function() {
    console.log("Done getting ALL glassdoor data!");
    rtn.resolve(arguments);
  });

  return rtn;
}

function getGlassdoorData(ticker) {
  var companyName = ticker.get('companyName');
  var symbol = ticker.get('ticker');
  console.log("Making request to glassdoor for " + companyName);
  var rtn = new Parse.Promise();

  Parse.Cloud.httpRequest({
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
    },
    success: function(httpResponse) {
      var employerData = httpResponse.data.response.employers[0];
      var data = { 'ticker': symbol, 'info': employerData };
      rtn.resolve(data);
    },
    error: function(httpResponse) {
      console.log("Error Requesting Data!");
      rtn.reject(httpResponse.data.response);
    }
  });

  return rtn;
}

function saveGlassdoorItems(itemList) {
  var rtn = new Parse.Promise();
  console.log("Saving all glassdoor data!");
  var promises = [];
  _.each(itemList, function(item) {
    promises.push(createGlassdoorItem(item));
  });

  Parse.Promise.when(promises).then(function() {
    console.log("Done with saving glassdoor data...");
    rtn.resolve(arguments);
  }, function(err) {
    console.log("Error saving glassdoor data!");
    console.log(err);
    rtn.reject(err);
  });

  return rtn;
}

function createGlassdoorItem(item) {
  var glassdoorItem = Parse.Object.extend("Glassdoor");
  var newItem = new glassdoorItem();
  console.log("Saving company info for " + item.info.name);
  return newItem.save({
    'ticker': item.ticker,
    'result': item.info
  });
}

function successfulImport(status) {
  console.log("-------------------------");
  console.log(">>> DONE WITH IMPORT! <<<");
  console.log("-------------------------");
  status.success("FINISHED!");
}

function importFailure(err) {
  console.log("ERRRROR: ", err);
  status.error(err);
}