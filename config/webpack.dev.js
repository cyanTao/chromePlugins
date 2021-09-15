const webpack = require('webpack');
const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  },
  output: {
    clean: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})