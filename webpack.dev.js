const path = require('path');
const FailPlugin = require('webpack-fail-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  watch: true,
  mode: 'development',
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: true,
              modules: false,
              minimize: false
            }
          },
          'sass-loader'
        ]
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
    path: path.resolve(__dirname, '.tmp'),
    filename: '[name].js'
  },
  plugins: [
    FailPlugin,
    new HtmlWebpackPlugin({
      env: 'dev',
      template: 'app/index.html'
    }),
    new BrowserSyncPlugin({
      notify: false,
      port: 9000,
      reloadDelay: 100,
      logLevel: 'info',
      online: true,
      https: false,
      server: {
        baseDir: ['.tmp', 'app'],
        directory: true
      }
    })
  ]
}