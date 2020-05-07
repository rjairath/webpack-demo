const path = require("path");
const common  = require("./webpack.common");
const merge = require("webpack-merge");
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    devtool: "none",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader"
                ]
            },
        ]
    }
});