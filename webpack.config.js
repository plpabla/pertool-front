const path = require('path');

module.exports = {
  entry: {
    bundle: './src/app.js',
    test: './src/test.general.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool: 'source-map'
};
