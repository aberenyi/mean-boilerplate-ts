'use strict'

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var DefinePlugin = require('webpack/lib/DefinePlugin')

var ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports =
{
  devtool: 'source-map',
  debug: false,
  entry: {
    vendor: './public/vendor.ts',
    app:  './public/boot.ts'
  },
  output: {
    path:  __dirname + '/public/dist',
    publicPath: '/dist/',
    filename: '[name]-[hash].bundle.js',
    sourceMapFilename: '[name]-[hash].map',
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
  plugins:
  [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor-[hash].bundle.js'}),
    new HtmlWebpackPlugin
    ({
      filename: '../../server/includes/scriptsDist.jade',
      inject: true,
      templateContent: function(templateParams)
      {
        return '' +
          'script(type="text/javascript", src="/dist/vendor-' + templateParams.webpack.hash + '.bundle.js")\n' +
          'script(type="text/javascript", src="/dist/app-' + templateParams.webpack.hash + '.bundle.js")'
      }
    }),
    new DefinePlugin({'process.env': {ENV: JSON.stringify(ENV)}}),
    new webpack.optimize.UglifyJsPlugin
    ({
      beautify: false,
      // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
      // mangle: { screw_ie8 : true },
      mangle: false,
      compress : { screw_ie8 : true},
      comments: false
    })
  ]
}
