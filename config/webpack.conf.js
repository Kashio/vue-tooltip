const webpack = require('webpack');
const conf = require('../../gulp.conf');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /.json$/,
        loader: 'json'
      },
      {
        test: /\.(woff2?|eot|ttf|png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=8192',
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css!sass!postcss'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /.vue$/,
        loader: 'vue'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.client.src('index.html')
    }),
    new ExtractTextPlugin("style.css"),
  ],
  vue: {
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],
    loaders: {
      sass: ExtractTextPlugin.extract("css!sass")
    }
  },
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.client.tmp),
    filename: 'app.js'
  },
  entry: `./${conf.path.client.src('app')}`
};
