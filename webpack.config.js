const path = require('path');
const webpack = require('webpack');
const _externals = require('externals-dependencies')
  
module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js"]
  },
  target: 'node',
  externals: _externals(),
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader', //需要安装对应的loader  再次安装typescript 本地-D
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
  ]
}