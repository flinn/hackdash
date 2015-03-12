var models = require('cloud/models/_models.js');

Parse.Cloud.define('currentRating', function(req, res) {
	var ticker = req.params.ticker;
	var GD = Parse.Object.extend("Glassdoor");

	var query = new Parse.Query(GD);



	query.equalTo('ticker', ticker);
	query.find().then(function(results) {
		res.success(results);
	}, function(err) {
		res.error(err);
	});
});

Parse.Cloud.define('historicRatings', function(req, res) {
	//LOGIC FOR FILTERING BY DATES wOULD GO HERE.
	res.error("Not Implemented!");
});