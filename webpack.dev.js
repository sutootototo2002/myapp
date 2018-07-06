 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   mode:"development",
   plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: '首页',
        filename: 'index.html',
        template: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
   ],
   devServer: {
     contentBase: './dist',
     historyApiFallback: true,
     noInfo: true,
     //让前后端http请求都转到node的3000端口，而不是前端的8080端口
     proxy: {
       '/': {
         target: 'http://localhost:3000/'
       }
     }
   }
 });