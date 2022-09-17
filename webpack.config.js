const realPath = require("path");
const htmlWebpack = require("html-webpack-plugin");
const esLintPlugin = require("eslint-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin");
const webpackObfuscator = require("webpack-obfuscator");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const isProductionMode = process.env.NODE_ENV === "production";
const entryFile = "./src/index.js";
const outputFiles = realPath.resolve(__dirname, "./dist");

const webpackConfig = {
  entry: entryFile,
  output: {
    path: outputFiles,
    filename: "main.js",
    clean: true,
    publicPath: "./",
  },
  module: {
    rules: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.(scss|css|sass)$/,
            use: [
                miniCssExtract.loader,
                'css-loader',
                'sass-loader'
            ],
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
            type: 'asset',
            loader: 'file-loader',
            options: {
                name: 'image/[name].[ext]',
            },
        },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new esLintPlugin(),
    new miniCssExtract(),
    new htmlWebpack({
      hash: true,
      template: realPath.resolve(__dirname, "./src/index.html"),
    }),
    new webpackObfuscator({
      rotateStringArra: true,
      reservedString: ["\s*"],
    }),
  ],
  resolve: {
    extensions: ["*", ".js"],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

module.exports = () => {
  if (isProductionMode) {
    webpackConfig.mode = "production";
  } else {
    webpackConfig.mode = "development";
    webpackConfig.watch = true;
    webpackConfig.watchOptions = {
      ignored: "**/node_modules",
    };
  }
  return webpackConfig;
};
