const path = require('path'); // node.js import

// ----- plugins

// --- 1. TerserPlugin
// npm install terser-webpack-plugin --save-dev
// compress js file, 17kb -> 4kb
// const TerserPlugin = require('terser-webpack-plugin'); (auto included in production mode)

// --- 2. MiniCssExtractPlugin
// npm install mini-css-extract-plugin --save-dev
// build  a independent css style file inside dist, separate css and js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// --- 3. CleanWebpackPlugin
// npm install clean-webpack-plugin --save-dev
// clean dist folder
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// --- 4. HtmlWebpackPlugin
// npm install html-webpack-plugin --save-dev
// create index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// --- 5. CopyWebpackPlugin
// npm install copy-webpack-plugin --save
// copy a folder inside dev env to dist folder
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/style/style.scss'],
  output: {
    // generate new name when file is changed
    // for browser caching
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    //publicPath: 'dist/', // 告訴webpack打包之後的靜態資料的位置
    publicPath: '',
    // HtmlWebpackplugin會根據publicPath自動寫入檔案位置, 若是打包好的index.html也會在dist, 就可以不用寫這個欄位, 保持空白
  },

  // production & dev
  // set variable "process.env.NODE_ENV" to "production"
  mode: 'production',
  // set variable "process.env.NODE_ENV" to "development"
  // mode: 'development',

  // for file importing
  module: {
    rules: [

      // for image file
      // npm install file-loader --save-dev , loader for image
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
          },
        }],
      },

      // for css
      // npm install style-loader css-loader --save-dev , loader for image
      // from right to left, from bottom to top
      // create a <style></style> in <head></head>
      {
        test: /\.css$/,
        use: [
          //'style-loader', // if no minicssextractplugin is in use
          MiniCssExtractPlugin.loader,
          'css-loader', 
        ]
      },

      // for handlebars
      // npm install handlebars-loader --save-dev
      // npm install handlebars --save-dev
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      },

      // for scss
      // npm install style-loader css-loader sass-loader node-sass --save-dev
      // {
      //   test: /\.scss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'sass-loader', 
      //   ]
      // },
      {
        test: /\.scss$/,
        use: [
        {
          loader: 'file-loader',
          options: {
            name: '/css/[name].css'
          }
         },
        //  {
        //    loader: 'extract-loader'
        //  },
        //  {
        //    loader: 'css-loader?-url'
        //  },
        //  {
        //    loader: 'postcss-loader'
        //  },
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader'
        },
         {
           loader: 'sass-loader'
         }
       ],
       include: [path.resolve(__dirname, 'src/style')]
     },

      // for js (babel compile)
      // npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
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
    // new TerserPlugin(), (auto included in production mode)

    // build css files into dist/style.css
    new MiniCssExtractPlugin({
      // filename: 'style.css',
      // for caching
      filename: 'style.[contenthash].css'
    }),

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