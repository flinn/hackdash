var request = require('request');
var common = require('./common');

function quotesUrl(ticker) {
	return 'http://api.fool.com/quotes/v3/admin/instruments/usa:' + ticker + '?apikey=J6tv7JMuX6DRTqgWbhFIR8pKEww4YV81';
}

exports.getInstrument = function(req, res){
	request(quotesUrl(req.query.ticker), function (err, response, body) {
		common.respondData(err, response, body, res);
	});
};

exports.searchQuote = function(req, res) {
	console.log("Searching for instrument id by ticker...");
};
