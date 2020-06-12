const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const name = path.basename(__dirname)

module.exports = (env = {}) => ({
  cache: env.cache ? { type: 'filesystem' } : undefined,
  stats: { modules: false },
  entry: '../src/index.tsx',
  output: {
    filename: `${name}.js`,
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['cache-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  plugins: [new HtmlWebpackPlugin({ filename: `${name}.html` })],
})
