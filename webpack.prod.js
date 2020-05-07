const path = require("path");
const common  = require("./webpack.common");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    devtool: "none",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(), 
            new TerserPlugin(),
            new HTMLWebpackPlugin({
                template: "./src/template.html",
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules : [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //Extract css into files
                    "css-loader", 
                    "sass-loader"
                ]
            },
        ]
    }
});