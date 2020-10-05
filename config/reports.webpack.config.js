const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const babelConfig = require('./babel.config');

module.exports = {
    mode: 'production',
    cache:   false,
    devtool: false,
    entry:   {
        client: [
            './src/reports/ui/index.scss',
            './src/reports/ui/index.js'
        ]
    },
    module:  {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /static/],
                options: babelConfig
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline',
                            plugins: () => [
                                autoprefixer({ browsers: ['last 3 versions'] }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [ path.resolve(__dirname, "node_modules") ]
                        }
                    }
                ],
                include: path.resolve('./src/reports/ui')
            }
        ]
    },
    resolve: {
        modules: [
            'static',
            'src',
            'node_modules'
        ]
    },
    output:  {
        path: path.resolve('../report_static_files'),
        filename: 'app.js',
        publicPath: 'report_static_files'
    },
    externals: {
        // react: 'React',
        // 'react-dom': 'ReactDOM'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false
                }
            }
        })]
    },
    performance: {
        hints: false,
        maxAssetSize: 1000000,
        maxEntrypointSize: 800000,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                IS_BROWSER: true
            }
        }),
        new MiniCssExtractPlugin({ filename: 'style.css' })
    ],
    node: {
        __dirname: true,
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
        Buffer: false
    }
};
