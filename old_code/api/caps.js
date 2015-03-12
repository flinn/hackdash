var common = require('cloud/api/common');

function capsUrl(ticker) {
	return 'http://api.fool.com/caps/ws/json/Ticker/' + ticker + '&apiKey=cf3d7f4bfeba0786742d5339a527af61';
}

exports.getRating = function(req, res) {
	/*request(capsUrl(req.query.ticker), function (err, response, body) {
      	common.respondData(err, response, body, res);
    });*/
};