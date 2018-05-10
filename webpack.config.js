var path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './src/app',

  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test: /(\.css)$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    },
    ]

  }
}