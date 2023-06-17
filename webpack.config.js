module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }],
      },
    ],
  },
}
