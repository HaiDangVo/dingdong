const path = require('path');
const webpack = require('webpack');
const FailPlugin = require('webpack-fail-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: true,
                modules: false,
                minimize: true
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        include: path.resolve(__dirname, 'app/assets/images'),
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false,
              useRelativePath: true
            }
          }
        ]
      }
    ]
  },
  entry: {
    app: `./app/app.js`
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins:[
    FailPlugin,
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      env: 'prod',
      template: 'app/index.html'
    }),
    new ExtractTextPlugin('[name].css')
  ]
}