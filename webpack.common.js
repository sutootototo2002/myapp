const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
//const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
    //entry: './src/index.js',
    entry: ['webpack-hot-middleware/client?noInfo=true&reload=true' , './src/index.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',  //设置别名，不然使用 import  识别不了 vue
            '@': path.join(__dirname, 'src')
        }
      },
    //devtool: 'inline-source-map',
    plugins: [
        new VueLoaderPlugin()
        //new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: '首页'
        // }),
        //new webpack.NamedModulesPlugin(),
        //new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
              },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};