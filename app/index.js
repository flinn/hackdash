var app = angular.module('hackdash', []);

require('./graph')(app);

app.controller('search', function() {
	console.log("Search controller initialized...");
});

app.controller('graph', function() {
	console.log("Graph controller initialized...");
});

require('./search');