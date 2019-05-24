const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const fileName = `bundle${(new Date()).getTime()}.js`

module.exports = {
  entry: path.resolve(__dirname, 'src', 'App.jsx'),
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
      template: path.join(__dirname, 'src', 'index.html'),
      title: 'Hosting Store',
      favicon: path.join(__dirname, 'src', 'favicon.ico')
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.jsx', '.js']
  }
}