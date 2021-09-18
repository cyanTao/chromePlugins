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
      filename: 'js/[name].js',
    },
    content: {
      import: path.resolve(sourcePath, './content/index.ts'),
      filename: 'js/[name].js'
    },
    background: {
      import: path.resolve(sourcePath, './background/index.ts'),
      filename: 'js/[name].js'
    }
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader'
          }
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
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './img'
          }
        }],

      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       outputPath: './fonts'
      //     }
      //   }],

      // },
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
      "@content": path.resolve(sourcePath, 'content'),
      "@background": path.resolve(sourcePath, 'background')
    },
    extensions: ['.ts', '.js']
  },
  externals: {
    jquery: 'jQuery',
  },
  optimization: {},
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`
    }),
    new HtmlWebpackPlugin({
      title: 'super JenKins',
      template: path.resolve(__dirname, '../template/popup.html'),
      filename: path.resolve(__dirname, '../dist/popup.html'),
      excludeChunks: ['content', 'background'],
      minify: process.env.NODE_ENV === 'production',
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