var request = require('request');
var common = require('./common');

function glassdoorUrl(name) {
	return 'http://api.glassdoor.com/api/api.htm?v=1&t.p=31415&t.k=fegPisJ2bhs&userip=0.0.0.0&useragent=&format=json&action=employers&q=' + name;
}

exports.getRating = function(req, res) {
	request(glassdoorUrl(req.query.name), function (err, response, body) {
      	common.respondData(err, response, body, res);
    });
};
