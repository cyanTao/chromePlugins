const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.config.js')
const webpack = require('webpack')
module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    clean: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})