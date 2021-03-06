const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    symlinks: false,
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    open: true,
    index: "index.html"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
