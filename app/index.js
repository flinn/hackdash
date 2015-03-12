var app = angular.module('hackdash', []);

//require('./run/graph')(app);
require('./controllers/root')(app);
require('./controllers/search')(app);
require('./controllers/graph')(app);
require('./controllers/dashboard')(app);
