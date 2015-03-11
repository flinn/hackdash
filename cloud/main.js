var parseConfig = {
	port: 80,
	useStatic: false
};

require('cloud/app.js').start(parseConfig);

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("test", function(request, response) {
  response.success("Hello world!");
});
