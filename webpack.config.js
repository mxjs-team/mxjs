const path = require('path')

const library = {
  name: 'myLibraryName',
  version: '0.1.0'
}

module.exports = (_, { mode }) => {
  const filename = (
    `${library.name}-${library.version}${ mode === 'production' ? '.min' : '' }.js`
  )

  return {
    entry: './src/index.js',
    devtool: 'inline-source-map',

    output: {
      path: path.resolve('dist'),
      filename,
      library: library.name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'typeof self !== "undefined" ? self : this'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        }
      ]
    }
  }
}
