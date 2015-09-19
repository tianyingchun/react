import path from 'path';
import express from 'express';
import cors from  'cors';
import favicon from 'serve-favicon';
import execTime from 'exec-time';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation'
import configureStore from '../docs/app/configureStore';
import fetchComponentData from '../docs/utils/fetchComponentData';
import HtmlHead from '../docs/components/HtmlHead';
import getRenderParams from '../docs/utils/getISORenderParams';
import compression from 'compression';
import { minify } from 'html-minifier';

const app = express();
const NODE_ENV = app.get('env') || 'production';
const port = process.env.PORT || 40000;
const profiler = new execTime('[ISO]', NODE_ENV === 'development', 'ms');

// compress all requests
app.use(compression());


app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Use this middleware to serve up static files built into the dist directory, milliseconds
app.use("/public", cors(), express.static(path.join(__dirname, '../public'), { maxAge: '30 days'}));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {

  // Resolve current server rendering params.
  let { project, routes, jsBundles, cssBundles } = getRenderParams(req, NODE_ENV);

  if (!routes || !project)  {

    console.log('router match failed in build.config.js, 404 not found!');
    // should give 404.
    res.status(404).send('Not found');
    return;
  }

  // default is web.
  let store = configureStore(project.subProjectName);

  console.log('projectName %s, sub projectName: %s', project.projectName, project.subProjectName);

  let location = createLocation(req.url);
  // start profileing.
  profiler.beginProfiling();

  match({ routes: routes(), location: location }, (error, redirectLocation, renderProps) => {
    profiler.step('React-Router');

    if (redirectLocation){
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }
    else if (error){
      res.status(500).send(error.message);
      return;
    }
    else if (renderProps == null){
      console.log('render props is null while through react-router, 404 not found!');
      res.status(404).send('Not found');
      return;
    }

    function renderView() {

      profiler.step('fetchComponentData');


      const InitialView = (
        <Provider store={store}>
          { <RoutingContext {...renderProps} /> }
        </Provider>
      );

      const componentHTML = ReactDOMServer.renderToString(InitialView);
      const head = ReactDOMServer.renderToString(React.createFactory(HtmlHead)({ links: cssBundles || [] }));

      const initialState = store.getState();

      let scriptsHtml = jsBundles.map(function (jsLink) {
        return ('<script src="' + jsLink + '"></script>');
      }).join('');

      const HTML = `
        <!DOCTYPE html>
        <html>
          ${head}
          <body>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
            <div id="react-view">${componentHTML}</div>
            ${scriptsHtml}
          </body>
        </html>
      `;
      profiler.step('renderFullPageHtml');

      return minify(HTML, {
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        collapseWhitespace: true
      });
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
}

var server = app.listen(port, function () {
  console.log('===Express server listening on port %d ===', server.address().port);
});
