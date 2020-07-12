const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {

  module: {
    rules: [
      {
        test: /\.scss$/,
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
        template: path.resolve(__dirname, "src", "index.html"),
        collapseInlineTagWhitespace: false,
      })
    ]
  };