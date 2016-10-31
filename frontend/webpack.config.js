/* eslint-env node */
const path = require('path')
const webpack = require('webpack')


module.exports = {
  entry: {
    app: path.resolve('client/index.js'),
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: { poll: 500 },  // until https://github.com/docker/docker/issues/18246 is resolved
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
  ],
}
