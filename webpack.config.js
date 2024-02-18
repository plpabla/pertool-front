const path = require('path');

module.exports = {
  entry: {
    bundle: './src/app.js',
    test: './src/test.general.js',
    demo: './src/tests/demo.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool: 'source-map'
};
