const path = require('path');
const webpack = require('webpack');
const _externals = require('externals-dependencies')
  
module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    // extensions: [".js"]
  },
  target: 'node',
  // 不打包nodemodules
  externals: _externals(),
  context: __dirname,
  module: {
    rules: [
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ]
}