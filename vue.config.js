module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.html',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  
  transpileDependencies: [
    'vuetify'
  ],
}
