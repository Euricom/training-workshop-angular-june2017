const path = require('path')

module.exports = {
  entry: './app/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [
        { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
  },
}
