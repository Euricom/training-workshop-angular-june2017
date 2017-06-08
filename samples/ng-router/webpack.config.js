const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json')
const helpers = require('./config/helpers');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {

  devtool: 'cheap-module-eval-source-map',

  // combine 2 file to one entry
  // one entry is required to enable hot reload
  entry: ['./src/polyfills.ts', './src/main.ts'],

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // so we don't have to specify the .ts extension when 
    // importing ts files
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      // typescript handling + angular2 template handing
      // see: https://github.com/TheLarkInn/angular2-template-loader
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader'
        ],
        exclude: [/\.(spec)\.ts$/]
      },

      // to import images or fonts
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },

      // handle all css/html files in the app folder as raw (string)
      // to enable template and css per component
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      // handle all css files outside the app folder as embedded styles
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'style-loader!css-loader?sourceMap',
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },

  plugins: [
    // Workaround for angular/angular##993
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),

    // inject process.env
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
        VERSION: JSON.stringify(pkg.version),
      }
    }),

    // copy static assets
    new CopyWebpackPlugin(
      [
        // file and folders to add
        {
          from: './src/favicon.ico'
        },
        {
          from: './src/assets',
          to: 'assets'
        },
      ], {
        // files to ignore
        ignore: ['**/.gitkeep'],
      }
    ),

    // generate index.html file
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    }),

    // During the hot update in webpack show friendly module name
    new webpack.NamedModulesPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: { 
      "/api/*": {
        "target": "http://localhost:3000",
        "logLevel": "debug"
      }
    }
  }
};

console.log('App Version: ', pkg.version)
console.log('Build Env:   ', ENV)
