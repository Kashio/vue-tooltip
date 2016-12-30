module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /.json$/,
        loader: 'json'
      },
      {
        test: /\.(css|scss)$/,
        loaders: 'style!css!sass'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /.vue$/,
        loader: 'vue'
      }
    ]
  },
  plugins: [],
  debug: true,
  devtool: 'inline-source-map'
};
