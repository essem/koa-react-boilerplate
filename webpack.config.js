var path = require('path');

module.exports = {
    entry: "./app/client/index.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.jsx?$/, loader: "babel", exclude: /node_modules/ }
        ]
    }
};
