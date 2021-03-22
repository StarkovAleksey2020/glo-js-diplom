const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV;

const isDev = mode === 'development';

const generateFilename = ext => isDev ?
    `[name].${ext}` :
    `[name].[contenthash].${ext}`;

module.exports = {
    entry: {
        main: './index.js',
    },
    output: {
        filename: `./js/${generateFilename('js')}`,
        path: path.resolve(__dirname, 'build'),
        environment: {
            arrowFunction: false
        }
    },
    mode,
    context: path.resolve(__dirname, 'src'),
    plugins: [new HtmlWebpackPlugin({
          template: './index.html',
          minify: {
            collapseWhitespace: !isDev,
          }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: `./css/${generateFilename('css')}`,
        }),
        new CopyPlugin({
          patterns: [{ from: 'favicon', to: 'favicon' }]
        }),
        new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ]
              }]
            ]
          }
        }),
    ],
    module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.(c|sa|sc)ss$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                }
              },
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                }
              },
            ],
          },
          {
            test: /\.(woff|woff2)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]'
                }
              },
            ],
          },
          {
            test: /\.html$/i,
            use: ['html-loader']
          },
        ]
      },
      devServer: {
        contentBase: './build',
        open: true,
        port: 3000,
        hot: true,
        compress: true,
        overlay: true,
        writeToDisk: false,
        historyApiFallback: true
      },
      devtool: isDev && 'source-map',
};