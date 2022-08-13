const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
    },
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
