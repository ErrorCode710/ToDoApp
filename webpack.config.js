const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        use: [
          MiniCssExtractPlugin.loader, // Use MiniCssExtractPlugin loader
          "css-loader",
        ],
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
    new MiniCssExtractPlugin({
      filename: "style.css", // Name of the output CSS file
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      cache: false,
      inject: "head", // Inject in the head
      scriptLoading: "defer",
      preload: [
        {
          rel: "preload",
          as: "style",
          href: "style.css",
        },
      ],
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
