const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = {
  entry: {
    main: ['./src/index']
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  output: {
    path: path.resolve('public'),
    publicPath:  '/',
    filename: '[name]-[chunkhash].js'
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve('src', 'images/logo.png')
    }),
    new HTMLWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|woff|eot|ttf|mp4)$/,
        loader: 'file-loader'
      },
      {
         test: require.resolve('snapsvg'),
         use: 'imports-loader?this=>window,fix=>module.exports=0',
      }
    ]
  }
};
