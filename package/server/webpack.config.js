const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { SourceMapDevToolPlugin } = require('webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')

const { NODE_ENV } = process.env

const ROOT_PATH = __dirname
const INPUT_PATH = path.resolve(ROOT_PATH, 'src')
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: {
    index: INPUT_PATH,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
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
      {
        test: /\.(graphql|gql)$/,
        include: [INPUT_PATH],
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new ForkTsCheckerPlugin(),
    new NodemonPlugin(),
  ],
}
