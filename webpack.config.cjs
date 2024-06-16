const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./style.css", "./index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Test",
      template: "./index.html", // to import index.html file inside index.js
    }),
    new MiniCssExtractPlugin(),
  ],
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
    cacheDirectory: path.resolve(__dirname, ".temp_cache"),
    compression: "gzip",
    hashAlgorithm: "md4",
    buildDependencies: {
      config: [__filename],
    },
  },
  devServer: {
    port: 3030, // you can change the port
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimizer: [new CssMinimizerPlugin(), new HtmlMinimizerPlugin()],
    minimize: true,
  },
};
