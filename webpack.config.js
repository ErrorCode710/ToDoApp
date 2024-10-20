const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(mp3|wav|ogg|m4a|aac)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "sounds/[name].[hash].[ext]", // Output naming
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      cache: false,
    }),
  ],
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3300,
    open: true,
    hot: true,
    watchFiles: ["src/**/*.html"],
  },
};
