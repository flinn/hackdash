module.exports = {
  start: startServer
};

function startServer(config) {
  var express = require('express');
  var app = express();

  app.set('views', 'cloud/views');  // Specify the folder to find templates
  app.set('view engine', 'ejs');    // Set the template engine
  app.use(express.bodyParser());    // Middleware for reading request body

  if (config.useStatic) {
    //If server is running locally, use the public directory for static files.
    app.use(express.static(config.staticFileDir));
  }

  app.get('/', function(req, res) {
    res.render('layout', { message: "HACKDASH", title: "HackDash" });
  });

  app.listen(config.port);
}