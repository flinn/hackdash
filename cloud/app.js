module.exports = {
  start: startServer
};

function startServer(config) {
  var express = require('express');
  var app = express();
  var request = require('request');
  var _ = require('underscore');
  var api = require('cloud/api');

  app.set('views', 'cloud/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());

  if (config.useStatic) {
    app.use(express.static(config.staticFileDir));
  }

  app.get('/', function(req, res) {
    res.render('layout', { isHome: true });
  });

  app.get('/dashboard', function(req, res) {
    res.render('layout', { isHome: false });
  });

  app.get('/api/instrument', api.quotes.getInstrument);
  app.get('/api/caps', api.caps.getRating);
  app.get('/api/glassdoor', api.glassdoor.getRating);

  app.listen(config.port);
}