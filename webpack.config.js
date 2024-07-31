const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('src/popup/index.tsx'),
        background: path.resolve("./src/background/background.ts"),
        contentScript: path.resolve("./src/contentScript/index.tsx")
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/assets/manifest.json'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/icon-32.png'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/icon-64.png'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/icon-128.png'), to: path.resolve('dist') }
            ],
        }),
        new HtmlPlugin({
            title: "Chrome Extension ReactJS",
            filename: "popup.html",
            chunks: ['popup']
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts','.js']
    },
    output: {
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'contentScript'
            }
        }
    }
}