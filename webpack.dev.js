const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: "babel-loader"
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images", // 负责输出目录, 即打包后的写在磁盘的位置
              publicPath: path.join(__dirname, "/dist/images") // 是对页面引入资源的补充,比如img标签引入或者css引入等
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      filename: "index.html",
      hash: false,
      inject: true,
      minify: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    open: true,
    port: 3000
  }
};