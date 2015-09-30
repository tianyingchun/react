var path = require('path');
var express = require('express');
var cors = require('cors');
var favicon = require('serve-favicon');
var compression = require('compression');

var app = express();
var port = process.env.PORT || 40000;
// compress all requests
app.use(compression());
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Use this middleware to serve up static files built into the dist directory
app.use("/public", cors(), express.static(path.join(__dirname, '../public')));
app.use("/shared", cors(), express.static(path.join(__dirname, '../shared')));
app.use("/components", cors(), express.static(path.join(__dirname, '../components')));
app.use("/docs", cors(), express.static(path.join(__dirname, '../docs')));
app.use("/", function (req, res) {
  var html = '<!DOCTYPE html>' +
    ' <html>' +
    '  <head>' +
    '  <meta charset="utf-8">' +
    '  <meta name="renderer" content="webkit">' +
    '  <meta http-equiv="Cache-Control" content="no-siteapp">' +
    '  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">' +
    '  <link rel="stylesheet" type="text/css" name="common" href="http://172.16.233.137:4000/shared/less-ui/public/common.css">' +
    '  <link rel="stylesheet" type="text/css" name="bundle" href="http://172.16.233.137:4000/public/docs/reactui/bundle.css">' +
    '</head>' +
    '  <body>' +
    '    <div id="react-view"></div>' +
    '    <script src="http://172.16.233.137:4000/public/browser-polyfill.js"></script>' +
    '    <script src="http://172.16.233.137:4000/public/reactkits.js"></script>' +
    '    <script src="http://172.16.233.137:4000/public/docs/reactui/bundle.js"></script>' +
    '  </body>' +
    '</html>';

  res.send(html);
});
var server = app.listen(port, function () {
  console.log('===Express server listening on port %d ===', server.address().port);
});
