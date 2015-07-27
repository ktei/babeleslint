var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './index.js' // Your appʼs entry point
  ],
  output:  {
    path: __dirname,
    filename: './dist/bundle.js',
    publicPath: "http://localhost:8080/static/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|Vendor)/,
        include: path.join(__dirname),
        loaders: ['react-hot', 'babel?optional[]=runtime']
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/, 
        exclude: /(node_modules|bower_components|Vendor)/,
        loader: "eslint-loader"
      }
    ]
  },
  stats: { colors: true },
  devServer: {
    stats: {
      chunkModules: false,
      colors: true
    },
    hot: true,
    proxy: {
      '/v1/*': 'http://localhost:24957',
      '/images/*': 'http://localhost:24957',
      '/fonts/*': 'http://localhost:24957'
    }
  },
  eslint: {configFile: '.eslintrc'}
};
