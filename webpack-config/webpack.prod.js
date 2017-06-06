const Merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const CommonConfig = require('./webpack.common.js');

module.exports = function (env) {
  const BUILD = path.resolve(process.cwd(), env.output);

  return Merge(CommonConfig(env), {
    output: {
      path: BUILD,
      filename: "presentation.bundle.[hash].js"
    },
    plugins: [
      new CleanWebpackPlugin([env.output], { root: process.cwd() }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ]
  })
}