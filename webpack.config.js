const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entries = {};

const componentsDir = path.join(__dirname, "src/components");
fs.readdirSync(componentsDir).filter(dir => {
    if (fs.statSync(path.join(componentsDir, dir)).isDirectory()) {
        entries[dir] = "./" + path.relative(process.cwd(), path.join(componentsDir, dir, dir));
    }
});

module.exports = {
    entry: entries,
    output: {
        filename: "[name]/[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk"),
            "@": path.resolve(__dirname, "src")
        },
    },
    stats: {
        warnings: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.s[ac]ss?$/,
                use: ["style-loader", "css-loader", "azure-devops-ui/buildScripts/css-variables-loader", "sass-loader"]
            },
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.woff?$/,
                type: 'asset/inline'
            },
            {
                test: /\.html?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
           patterns: [ 
               { from: "**/*.html", context: "src/components" }
           ]
        })
    ]
};
