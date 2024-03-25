const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dirAssets = path.join(__dirname, 'assets');
const dirApp = path.join(__dirname, 'app');
const dirShared = path.join(__dirname, 'shared');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = 'node_modules';

module.exports = {
  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.scss')
  ],
  resolve: {
    modules: [
      dirApp,
      dirShared,
      dirAssets,
      dirNode,
      dirStyles
    ]
  },
  node: {
    __dirname: false,
    __filename: false,
    global: false
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './shared',
          to: ''
        }
      ]
    }),

    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    })
  ],

  module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
        },

        {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    }
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'post-css-loader'
                }
            ]
        }

    ]
  }
};