let reloader = require("webpack-watch-livereload-plugin")
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/src/server/static"
    },
    
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery": "$",
        "socket.io-client": "io",
    },

    plugins: [
        new reloader({
            files: [
                // Replace these globs with yours 
                './src/**/*.html',
                './src/**/*.css',
                './src/**/*.py',
                './src/**/*.js',
            ]
        }),
        new WebpackBuildNotifierPlugin({
            title: "DoGO"
        })
    ]

} 