const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin"); // 压缩js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
// const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js"
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
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
              outputPath: "images", // 负责输出目录, 即打包后的写在磁盘的位置
              publicPath: path.join(__dirname, "/dist/images") // 是对页面引入资源的补充,比如img标签引入或者css引入等
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({ extractComments: false }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      filename: "index.html",
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    })
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: {
    //         path: "https://unpkg.com/react@16/umd/react.production.min.js",
    //         type: "js"
    //       },
    //       global: "React"
    //     },
    //     {
    //       module: "react-dom",
    //       entry: {
    //         path:
    //           "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    //         type: "js"
    //       },
    //       global: "ReactDom"
    //     }
    //   ]
    // })
  ]
};
