//var common = require('cloud/api/common');

function quotesUrl(ticker) {
}

exports.getInstrument = function(req, res){
	Parse.Cloud.httpRequest({
  		method: "GET",
  		url: 'http://api.fool.com/quotes/v3/admin/instruments/usa:' + req.query.ticker + '?apikey=J6tv7JMuX6DRTqgWbhFIR8pKEww4YV81'
	}).then(function(result) {
		res.send(result);
	}, function(error) {
		res.send(500, error);
	});
};

exports.searchQuote = function(req, res) {
	console.log("Searching for instrument id by ticker...");
};
