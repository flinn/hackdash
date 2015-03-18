var app = angular.module('hackdash', ['parse-angular', 'angularMoment']);

require('./controllers/root')(app);
require('./controllers/search')(app);
require('./controllers/searchHistory')(app);
require('./controllers/graph')(app);
require('./controllers/dashboard')(app);
require('./services/parse')(app);

require('./run/graph')(app);
app.run(function() {
	Parse.initialize('wTCyHepvBQOM57u3Ou13hZ2aWur65esYf8hNLm1L', 'd0IZ7lDqxjHAlCSz9txjh9KZfJOaRD4tYAnsswwA');
	console.log("Parse was initialized!");
});