var projectDir = __dirname;

var localConfig = {
	port: 1337,
	useStatic: true,
	staticFileDir: projectDir + '/public'
};

//Start the app server with local configurations...
var app = require('./cloud/app').start(localConfig);