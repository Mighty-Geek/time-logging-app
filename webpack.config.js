const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        './src/main.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    sourceMap: true
                }
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
        },
        {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: [{
                loader: "file-loader",
                options: {
                    outputPath: "assets/"
                }
            }]
        }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
};