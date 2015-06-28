import Express from 'express';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './views/routes';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createRedux from './redux/create';
import { Provider } from 'redux/react';
import api from './api/api';
import ApiClient from './ApiClient';
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

let webpackStats;

if (process.env.NODE_ENV === 'production') {
  webpackStats = require('../webpack-stats.json');
}

if (app.get('env') === 'production') {
  app.use(require('serve-static')(path.join(__dirname, '..', 'static')));
}

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use((req, res) => {
  const client = new ApiClient(req);
  const redux = createRedux(client);
  const location = new Location(req.path, req.query);
  if (process.env.NODE_ENV === 'development') {
    webpackStats = require('../webpack-stats.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../webpack-stats.json')];
  }

  const segment = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.1";analytics.load("E3Hfp3MrhRLsNsqPpETK4gibE6zEG9RC");analytics.page()}}();'

  Router.run(routes, location, (error, initialState) => {
    if (error) {
      res.status(500).send(error);
    } else {
      Promise.all(initialState.components
        .filter(component => component.fetchData)
        .map(component => {
          return component.fetchData(redux.dispatch);
        }))
        .then(() => {
          const state = redux.getState();
          res.send('<!doctype html>\n' + React.renderToString(
              <html lang="en-us">
              <head>
                <meta charSet="utf-8"/>
                <title>TrailerZoo</title>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
                      media="screen, projection" rel="stylesheet" type="text/css"/>
                    {webpackStats.css.map((css, i) => <link href={css} key={i} ref={i} media="screen, projection" rel="stylesheet" type="text/css"/>)}
                <script dangerouslySetInnerHTML={{__html: segment}}/>
              </head>
              <body>
              <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(
                <Provider redux={redux}>
                  {() => <Router location={location} {...initialState}/>}
                </Provider>)
              }}/>
              <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(state)};`}}/>
              <script src={webpackStats.script[0]}/>
              </body>
              </html>));
        }).catch((err) => {
          res.status(500).send(err.stack);
        });
    }
  });
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      api().then(() => {
        console.info('==> ✅  Server is listening');
        console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort);
      });
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
