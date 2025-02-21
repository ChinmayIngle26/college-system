const path = require('path');

module.exports = {
    // Add your existing configuration here
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "url": require.resolve("url/"),
            "os": require.resolve("os-browserify/browser"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "zlib": require.resolve("browserify-zlib"),
            "util": require.resolve("util/"),
            "net": false, // Add this line
            "tls": false , // Add this line
            "child_process": false, // Add this line
            "dns": false
        }
    }
};