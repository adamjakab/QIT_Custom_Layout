const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
    entry: {
        app: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: false,
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false,
            minify: false,
            template: 'src/template/queue-page.ejs',
            templateParameters: {
                title: 'Custom Layout',
                vm: {
                    customerId: 'adjatest',
                    eventId: 'event_123',
                    queueId: '0544e3a7-11fd-41b0-b1d1-832e71d47475',
                    queueInfo: {
                        ticket: {
                            whichIsIn: "37 minutes",
                            progress: 0.77,
                        },
                        message: {
                            header: "Message last updated:",
                            text: "This is a test message. This is a test message. This is a test message.",
                        },
                        texts: {
                            header: "You are now in line",
                            body: "You are in line for My Layout Test Event.  When it is your turn, you will have 10 minutes to enter the website.",
                            logoSrc: 'images/logo.png',
                            toppanelIFrameSrc: (fs.existsSync('src/html/top.html') ? 'html/top.html' : ''),
                            sidepanelIFrameSrc: (fs.existsSync('src/html/side.html') ? 'html/side.html' : ''),
                            leftpanelIFrameSrc: (fs.existsSync('src/html/left.html') ? 'html/left.html' : ''),
                            rightpanelIFrameSrc: (fs.existsSync('src/html/right.html') ? 'html/right.html' : ''),
                            middlepanelIFrameSrc: (fs.existsSync('src/html/middle.html') ? 'html/middle.html' : ''),
                            bottompanelIFrameSrc: (fs.existsSync('src/html/bottom.html') ? 'html/bottom.html' : ''),
                        },
                        layout: {
                            logoVisible: true,
                            topPanelVisible: fs.existsSync('src/html/top.html'),
                            sidePanelVisible: fs.existsSync('src/html/side.html'),
                            leftPanelVisible: fs.existsSync('src/html/left.html'),
                            rightPanelVisible: fs.existsSync('src/html/right.html'),
                            middlePanelVisible: fs.existsSync('src/html/middle.html'),
                            bottomPanelVisible: fs.existsSync('src/html/bottom.html'),
                        }
                    },
                },
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "html/*.html",
                    to: "[path][name].[ext]",
                    context: "src/",
                },
            ],
        }),
    ],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 2512000
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        contentBase: './dist'
    }
};

module.exports = (env, argv) => {
    /**
     * Use: webpack --mode development
     */
    if (argv.mode === 'development') {
        config.optimization.minimize = false;
    }

    /**
     * Use: webpack --mode production
     */
    if (argv.mode === 'production') {
        config.optimization.minimize = true;
        config.optimization.minimizer = [
            '...', // extend existing minimizers (i.e. `terser-webpack-plugin`)
            new CssMinimizerPlugin(),
        ];
    }

    return config;
};