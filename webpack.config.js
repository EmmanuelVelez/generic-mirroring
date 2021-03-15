const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/index.ts',

  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ],

  // Resolve .ts and .js extensions
  resolve: {
    extensions: ['.ts', '.js']
  },

  // Target node
  target: 'node',

  // Set the webpack mode
  mode: process.env.NODE_ENV || 'production',
  externals: {
    'aws-sdk': 'aws-sdk',
  },

  // Add the TypeScript loader
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  }
};
