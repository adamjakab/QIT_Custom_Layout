const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        webpackImporter: false,
                    },
                }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        assetModuleFilename: 'images/[hash][ext][query]',
        path: path.resolve(__dirname, 'dist'),
    },
};

