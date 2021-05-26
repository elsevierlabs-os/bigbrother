module.exports = {
    "parser": "babel-eslint",
    "env": {
        "es2020": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module",
        "babelOptions": {
            "configFile": "./config/babel.config.js"
        }
    },
    "plugins": [
        "mocha",
        "react"
    ],
    "globals": {
        "window": "readonly",
        "document": "readonly",
        "performance": "readonly",
        "describe": "readonly",
        "beforeEach": "readonly",
        "afterEach": "readonly",
        "it": "readonly",
        "performance": "readonly"
    },
    "rules": {
        "template-curly-spacing" : "off",
        "indent": "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/prop-types": "off",
        "react/jsx-key": "off",
        "no-unused-vars": ["error", { "vars": "local" }],
        "quotes": "off"
    }
};
