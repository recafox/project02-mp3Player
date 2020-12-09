const path = require('path'); // node.js import
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/style/style.scss'],
  output: {
    filename: 'bundle.js', // no content hash, dont need caching
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },

  // production & dev
  // set variable "process.env.NODE_ENV" to "development"
  mode: 'development',

  // dev server
  // npm install webpack-dev-server --save-dev
  // start live server: (package.json) "dev": "webpack serve --config webpack.dev.config.js --hot"
  devServer: {
    // absolute path
    contentBase: path.resolve(__dirname, './dist'),
    index: 'index.html',
    port: 9000,
    writeToDisk: true,
  },

  // for file importing
  module: {
    rules: [

      // for image file
      // npm install file-loader --save-dev , loader for image
      {
        test: /\.(png|jpg)$/,
        use: [
          'file-loader', 
        ]
      },

      {
        test: /\.css$/,
        use: [
          'style-loader', // if no minicssextractplugin is in use
          // MiniCssExtractPlugin.loader,
          'css-loader', 
        ]
      },

      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader', 
        ]
      },


      {
        test: /\.js$/,
        // do not change anything in node_modules
        exclude: /node_modules/,
        // use object schema
        use: {
          loader: 'babel-loader',
          // babel setting
          options: {
            presets: ['@babel/env'],
            // specify plugin
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },

  // some functionalities
  plugins: [
    // new TerserPlugin(), // no need for dev

    // build css files into dist/style.css  // no need for dev
    // new MiniCssExtractPlugin({
    //   // filename: 'style.css',
    //   // for caching
    //   filename: 'style.[contenthash].css'
    // }),

    // new CleanWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', // clean dist folder, even how nesting it is
        // if need to clean folder other than dist
        // path.join(process.cwd, 'otherFolder/**/*/'),
      ]
    }),
    // the path will be based on publicPath
    // new HtmlWebpackPlugin({
    //   title: 'Hello world',
    // }),

    // integrating with template engine (e.g. handlebars)
    new HtmlWebpackPlugin({
      // insert these values into template as htmlwebpackplugin.options. xxx
      // xxx: value
      title: 'Hello Webpack!!',
      template: './src/index.hbs',
      description: "a description for webpack!"
    
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from:'./src/assets',
          to:'assets'
        },
      ]
    }),

  ]
}