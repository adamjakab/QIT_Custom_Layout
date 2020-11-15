const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        custom_layout: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /index\.html$/i,
                loader: 'file-loader',
                options: {name: '[name].[ext]'},
            },
            {
                test: /\.(css)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        assetModuleFilename: 'images/[name][ext][query]',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "src/index.html", to: "index.html" },
                { from: "src/css/style.css", to: "style.css" },
                { from: "images/**/*", to: "[path][name].[ext]", context: "src/" },
            ],
        }),
    ],
    devServer: {
        contentBase: './dist'
    }
};
