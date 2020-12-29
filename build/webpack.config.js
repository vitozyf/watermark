const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    watermark: './src/index.js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@src': path.resolve('src'),
      '@assets': path.resolve('src/assets'),
      '@component': path.resolve('src/component'),
      '@core': path.resolve('src/core'),
      '@utils': path.resolve('src/utils'),
      '@locale': path.resolve('src/locale'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /(node_modules)/,
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
