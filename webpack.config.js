const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const siteUrl = process.env.SITE_URL || '';
const mailingApi = process.env.MAILING_SUBSCRIPTION_API || 'http://localhost:3000';

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
    new webpack.DefinePlugin({
      'site': {
        'url': JSON.stringify(siteUrl)
      },
      'mailing': {
        'api': JSON.stringify(mailingApi)
      }
    }),
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
          presets: ['es2015', 'react'],
          plugins: [
            'transform-object-rest-spread'
          ]
        },
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|woff|eot|ttf|mp4)$/,
        loader: 'file-loader'
        // loader: 'file-loader?name=[name].[ext]?[hash:5]'
      },
      {
         test: require.resolve('snapsvg'),
         use: 'imports-loader?this=>window,fix=>module.exports=0',
      }
    ]
  }
};
