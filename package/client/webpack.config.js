const path = require('path')
const { SourceMapDevToolPlugin } = require('webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const { NODE_ENV } = process.env

const ROOT_PATH = __dirname
const INPUT_PATH = path.resolve(ROOT_PATH, 'src')
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  target: 'web',
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: {
    index: INPUT_PATH,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    port: 8000,
  },
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [INPUT_PATH],
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'esnext',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new ForkTsCheckerPlugin(),
    new HtmlPlugin({
      hash: false,
      template: `${INPUT_PATH}/index.html`,
      filename: 'index.html',
    }),
  ],
}
