const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    devtool: "none",
    entry: "./src/index.js",
 
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html",
    })],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    'style-loader', // injects css to the dom
                    'css-loader', // turns css into commonjs
                    'sass-loader' // turns scss into css - loaders load in reverse order
                ], 
            },
            {
                test: /\.html$/i,
                use: [
                    'html-loader'
                ],
            },
            {
                test: /\.(jpg|pn?g|svg)$/i,
                use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name][contenthash].[ext]',
                            outputPath: 'imgs'
                        }
                    }
             
            }
        ],
    },

}