'use strict';

var webpack = require('webpack')
var DefinePlugin = require('webpack/lib/DefinePlugin')

var ENV = process.env.NODE_ENV = process.env.ENV = 'development'

module.exports =
{
  devtool: 'eval',
  debug: true,
  entry: {
    app:  ['webpack-dev-server/client?http://localhost:8080', './public/boot.ts'],
    vendor: './public/vendor.ts'
  },
  output:
  {
    // from http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. It points to where
    // the files will eventually be bundled in production
    path:  __dirname + '/public/dist',
    // This has been moved to the webpack-dev-server config in gulpfile.js
    //publicPath: '/dist/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {extensions: ['', '.ts','.js','.json','.css','.html']},
  module:
  {
    preLoaders:
    [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [/node_modules/]
    }],
    loaders:
    [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query:
        {
          ignoreDiagnostics: [2345]
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader : 'file-loader?name=../assets/fonts/[name].[ext]?[hash]'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  ts:
  {
    transpileOnly: true,
    isolatedModules: true
  },
  plugins:
  [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    new DefinePlugin({'process.env': {ENV: JSON.stringify(ENV)}})
  ]
};
