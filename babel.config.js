const config = {
    presets: ["@babel/preset-env"],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-class-properties",
    ]
};

module.exports = config;