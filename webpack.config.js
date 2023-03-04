// const path = require('path');
// const nodeExternals = require('webpack-node-externals');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   // mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
//   mode: 'production',
//   entry: './src/index.ts',
//   output: {
//     path: path.resolve(__dirname, 'dist')
//   },
//   resolve: {
//     extensions: ['.ts', '.js', 'json'],
//     alias: {
//       "@": path.join(__dirname, "./src")
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: ['ts-loader'],
//         exclude: ['/node_modules/'],
//       },
//       {
//         test: /\.html$/,
//         use: "html-loader"
//     },
//     ],
//   },
//   node: {
//     __dirname: true,
//   },
//   externalsPresets:{ node: true },
//   // externals: [nodeExternals()],
//   externals: {
//   },
//   devtool: 'source-map',
//   plugins: [new CleanWebpackPlugin()],
// };