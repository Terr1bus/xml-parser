var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    watchContentBase: true,
    hot: true,
    open: true,
  }
}