// webpack.dev.js
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true, // SPA routing fallback
    watchFiles: ["src/**/*"], // watch all source files
    static: false, // serve from webpack's in-memory bundle
    devMiddleware: {
      publicPath: "/", // ensure bundle reachable at root
      writeToDisk: true, // optional: write files to disk for inspection
    },
  },
});
