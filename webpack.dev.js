const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, 'src'),
          name: '[path][name].[ext]'
        },
      },
      
    ],
  },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
      })
    ]
  };