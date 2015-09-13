import path from 'path';
import express from 'express';
import cors  from  'cors';
import favicon from 'serve-favicon';

const app = express();
const port = process.env.PORT || 40000;

app.use(favicon(path.join(__dirname, './public/favicon.ico')));

// Use this middleware to serve up static files built into the dist directory
app.use("/public", cors(), express.static(path.join(__dirname, './public')));
app.use("/components", cors(), express.static(path.join(__dirname, './components')));
app.use("/docs", cors(), express.static(path.join(__dirname, './docs')));

var server = app.listen(port, function () {
  console.log('===Express server listening on port %d ===', server.address().port);
});
