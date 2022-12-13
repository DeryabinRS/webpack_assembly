const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'developmant'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'sourse-map' : undefined

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 4000,
        open: true,
        hot: true, 
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module:{
        rules:[
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(c|ac|sc)ss$/i,
                use: [
                    devMode ? 'css-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')],
                            }
                        }
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator:{
                    filename: 'fonts/[name][ext]'
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                            progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                            enabled: false,
                            },
                            pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                            },
                            gifsicle: {
                            interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                            quality: 75
                            }
                        }
                    }
                ],
                type: 'asset/resource',
                generator:{
                    filename: 'img/[name][ext]'
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}