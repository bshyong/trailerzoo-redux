var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'jasmine' ], //use jasmine test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0&optional=runtime&plugins=typecheck' },
          { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader") }
        ]
      },
      watch: true,
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [new ExtractTextPlugin('[name]-[chunkhash].css')]
    },
    webpackServer: {
      noInfo: true // don't spam the console when running in karma!
    }
  });
};
