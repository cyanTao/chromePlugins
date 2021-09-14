const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourcePath = path.resolve(__dirname, '../src')
const styleLoader = process.env.NODE_ENV === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  entry: {
    popup: {
      import: path.resolve(sourcePath, './popup/index.ts'),
      filename: '[name].[hash].js'
    },
    content: {
      import: path.resolve(sourcePath, './content/index.ts'),
      filename: 'content.js'
    },
  },
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          styleLoader,
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          styleLoader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.vue?$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    alias: {
      "@": sourcePath,
      "@popup": path.resolve(sourcePath, 'popup'),
      "@content": path.resolve(sourcePath, 'content')
    },
    extensions: ['.ts', '.js']
  },
  externals: {
    jquery: 'jQuery',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash:8].css`
    }),
    new HtmlWebpackPlugin({
      title: 'super JenKins',
      template: path.resolve(__dirname, '../template/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      excludeChunks: ['content'],
      minify: true,
      showErrors: true,
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../template'),
        to: path.resolve(__dirname, '../dist'),
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ['**/*.html']
        },
      }],
    }),
  ],
};