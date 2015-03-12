exports.start = function(config) {
  var express = require('express');
  var app = express();
  var _ = require('underscore');

  app.set('views', 'cloud/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());

  if (config.useStatic) {
    app.use(express.static(config.staticFileDir));
  }

  app.get('/', function(req, res) {
    res.render('index', { isHome: true });
  });

  app.get('/dashboard', function(req, res) {
    res.render('index', { isHome: false });
  });

  app.listen(config.port);
};