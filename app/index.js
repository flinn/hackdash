var app = angular.module('hackdash', []);

require('./graph')(app);

app.controller('search', function($scope) {
	console.log("Search controller initialized...");
});

app.controller('graph', function($scope) {
	console.log("Graph controller initialized...");
});

require('./search');