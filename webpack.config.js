const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          //'style-loader', 
          MiniCssExtractPlugin.loader,
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
  resolve: {
    alias: {
      '@': __dirname,
      '@assets': __dirname + '/assets/'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index/index.html',
      filename: 'index.html',
      title: 'home',
      chunks: ['index'],
      exclude: ['fileloader', 'flex']
    }),
    new HtmlWebpackPlugin({
      template: './pages/fileloader/index.html',
      filename: 'fileloader.html',
      title: 'fileloader',
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:8].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]]/,
          chunks: "all",
          priority: -10,
        },
        common: {
          name: 'common',
          chunks: "all",
          minChunks: 2,
          minSize: 1,
          priority: -20,
        }
      }
    }  
  },
  /* optimization: {
    splitChunks: {
      chunks: "async", //默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
      minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
      minChunks: 1,  // 表示被引用次数，默认为1；
      maxAsyncRequests: 5,  //所有异步请求不得超过5个
      maxInitialRequests: 3,  //初始话并行请求不得超过3个
      automaticNameDelimiter:'~',//名称分隔符，默认是~
      name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
        common: {
          name: 'common',  //抽取的chunk的名字
          chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
          },
          test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
          },
          priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
          minChunks: 2,  //最少被几个chunk引用
          reuseExistingChunk: true,//  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
          enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
        }
      }
    }
  }, */
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
  }
}