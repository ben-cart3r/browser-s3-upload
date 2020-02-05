const path = require("path");

module.exports = {
  entry: {
    app: "./client/src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client/dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ] 
  }
};
