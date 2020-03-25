'use strict';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  mode: 'development',
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {},
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ['node_modules'],
  },
  output: {
    filename: 'node-gdrive-strings.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
		minimize: false
  },
  externals: [
    {},
  ],
};