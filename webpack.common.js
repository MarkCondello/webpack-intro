//const path = require("path")

module.exports = {
    devtool: "none",
    entry: {
       main: "./src/index.js",
       vendor: "./src/vendor.js",
    },

    module: {
        rules: [
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