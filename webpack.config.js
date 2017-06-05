const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const ROOT = path.resolve(__dirname);
const BUILD = path.resolve(ROOT, 'build');

const config = {
  context: ROOT,
  devtool: "source-map",
  entry: {
    app: './lib/index.ts'
  },
  output: {
    path: BUILD,
    publicPath: "/",
    filename: "presentation.bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader",
      //   exclude: [
      //     /\/node_modules\//
      //   ]
      // },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: path.resolve(ROOT, 'tsconfig.json')
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.eot(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
      },
      {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.html$/,
        exclude: path.resolve(ROOT, 'index.html'),
        loader: 'html-loader'
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      }, {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, 'index.html'),
      chunksSortMode: "dependency"
    }),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      SLIDE_FOLDER: JSON.stringify(path.resolve(process.cwd(), 'slides'))
    })
  ],
  devServer: {
    contentBase: ROOT
  },
  node: {
    fs: 'empty'
  }
};

module.exports = config;
