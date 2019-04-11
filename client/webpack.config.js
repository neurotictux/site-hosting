const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const fileName = `bundle${(new Date()).getTime()}.js`
console.log(fileName)

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: fileName
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'public'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Hosting Store',
      favicon: 'favicon.ico'
    }),
    new CleanWebpackPlugin()
  ]
}