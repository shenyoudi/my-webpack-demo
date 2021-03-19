const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: './pages/index/index.js',
    fileloader: './pages/fileloader/index.js',
    flex: './pages/flex/index.js'
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: './images/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      title: 'index',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './pages/fileloader/index.html',
      filename: 'file-loader.html',
      title: 'file-loader',
      chunks: ['fileloader'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/flex/index.html',
      filename: 'flex.html',
      title: 'flex',
      chunks: ['flex']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/'),
          to: path.resolve(__dirname, 'dist/')
        }
      ]
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}