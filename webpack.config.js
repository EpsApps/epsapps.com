const webpack = require('webpack');
const path = require('path');
const through = require('through');
const multi = require('multi-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DtsCreator = require('typed-css-modules');

// sets the src directory as the context
const context = path.resolve(__dirname, './src');

/*
Plugins
*/

// contextReplacementPlugin - fixes Angular 2 error
const contextReplacementPlugin = new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, __dirname);

// replaces import with require - CSS has to be required and not imported
function transpileImportToRequire(source, extension){
 var regex = new RegExp("import\\s+\\*\\s+as\\s((\\w|-|_)+)\\s+from\\s+('|\")((.*?\\." + extension + "))('|\")", "g");
 return source.replace(regex, 'const $1 = require("$5");');
}

// loaderOptionsPlugin - configuration for CSS Modules
const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  options: {
    ignore: [],
    transforms: [
      function (file) {
        let creator = new DtsCreator({ camelCase: true });
        creator.create(file).then(content => {
          // write content to "src/style.css.d.ts"
          content.writeFile();
        });
        return through(
          function (buf) {
            this.queue(buf);
          },
          function () {
            this.queue(null);
          }
        );
      },
      function (file) {
        return through(
          function (buf) {
            this.queue(transpileImportToRequire(buf.toString(), "css"));
          },
          function () {
            this.queue(null);
          }
        );
      }
    ]
  }
});

// extractTextPlugin for non modular css
const extractTextPlugin = new ExtractTextPlugin('[name]global.css');

const plugins = [contextReplacementPlugin, loaderOptionsPlugin, extractTextPlugin];

/*
Module Rules
*/

const babelOptions = {
  presets: ["es2015"],
  plugins: [
    'transform-react-jsx',
    [
      'react-css-modules',
      {
        context
      }
    ]
  ]
};

const tsxLoader = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: babelOptions
    },
    {
      loader: 'ts-loader'
    },
    {
      loader: 'transform-loader?1'
    }
  ]
};

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader'
    }
  ]
};

const cssLoader = {
  enforce: 'pre',
  test: /\.css$/,
  use: [
    'style-loader',
    'typings-for-css-modules-loader?camelCase&modules&import',
    'transform-loader?0'
  ],
  exclude: [/(src\/css)/]
};

const globalCSSLoader = { test: /\.global.css?$/, use: [ 'style-loader', 'css-loader' ] };

const jsonLoader = { test: /\.json$/, loader: 'json-loader' };
const htmlLoader = { test: /\.html/, loader: 'html-loader?minimize=false' };
const imageLoader = { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]' };
const woffLoader = { test: /\.woff2?$/, loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' };
const fontLoader = { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=dist/fonts/[name].[ext]' };

const moduleRules = [tsxLoader, jsLoader, cssLoader, globalCSSLoader, jsonLoader, htmlLoader, imageLoader, woffLoader, fontLoader];

/*
Configuartion
*/

var config = {
  context,
  entry: {
    vendor: ['babel-polyfill', 'fbemitter', 'react', 'react-dom'],
    'app': path.resolve(__dirname, './src/index.tsx'),
    'css': path.resolve(__dirname, './src/css.tsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.es6', '.js', '.json']
  },
  plugins: plugins,
  module: {
    rules: moduleRules
  },
  node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

var configureBuildForEnvironment;

var env = 'dev';
//var env = 'production';

if (!(env === 'production')) {
  configureBuildForEnvironment = require('./webpack.config.development');
} else {
  configureBuildForEnvironment = require('./webpack.config.production');
}

module.exports = configureBuildForEnvironment(config);