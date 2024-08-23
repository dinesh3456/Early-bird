const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    zlib: require.resolve("browserify-zlib"),
    buffer: require.resolve("buffer"),
    process: require.resolve("process/browser"),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  // Ignore source-map-loader warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  // Disable source maps for problematic modules
  config.module.rules.push({
    test: /\.m?js$/,
    enforce: "pre",
    use: ["source-map-loader"],
    exclude: [
      /@walletconnect/,
      /@thirdweb-dev/,
      /node_modules[\\/]@walletconnect/,
      /node_modules[\\/]@thirdweb-dev/,
    ],
  });

  // Ensure process/browser is resolved correctly
  config.resolve.alias = {
    ...config.resolve.alias,
    "process/browser": require.resolve("process/browser"),
  };

  return config;
};
