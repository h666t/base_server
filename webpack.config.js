const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.html$/,
        use: "html-loader"
    },
    ],
  },
  node: {
    __dirname: false,
  },
  externalsPresets:{ node: true },
  // externals: [nodeExternals()],
  externals: {
    'sequelize':"require('sequelize')",
    'sqlite3':"require('sqlite3')",
  },
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin()],
};