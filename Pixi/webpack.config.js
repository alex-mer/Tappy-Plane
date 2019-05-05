const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TSLintPlugin = require("tslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/App.ts",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: ["json-loader"],
        type: "javascript/auto"
      }
    ]
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  performance: {
    hints: false
  },

  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "HTML5 Game",
      container: "appContainer",
      template: "./src/index.html"
    }),

    new TSLintPlugin({
      files: ["./src/**/*.ts"]
    }),

    new CopyWebpackPlugin([
      {
        from: "static",
        ignore: ["textures/{**/*,*}"]
      }
    ])
  ],

  devServer: {
    stats: "errors-only",
    port: 9000
  }
};
