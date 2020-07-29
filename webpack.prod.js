const path = require("path")
const common = require('./webpack.common');
const {merge} = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
      output: {
        filename: '[name][contenthash].bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    optimization : {
      minimizer: [
        new OptimizeCssAssetsPlugin(), 
        new TerserWebpackPlugin(),
      ],

      //related to purge css
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({filename: "[name].[contentHash].css"}),
      new CleanWebpackPlugin(), 
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
        }
      }),
      //only removes unused styles after second build
      new PurgecssPlugin({
        paths: glob.sync(`${path.resolve(__dirname, 'dist')}/*.html`,  { nodir: true }),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader, // injects css to the dom
            "css-loader", // turns css into commonjs
            "sass-loader" // turns scss into css - loaders load in reverse order
          ],
        },
      ]
    },
});