const webpack = require("webpack");
const path = require('path');
const InstallPlugin = require('./install-webpack-plugin-master/index.js');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                "@babel/preset-env",
                {
                    "modules": false,
                    "useBuiltIns": "entry",
                    "corejs": 3
                }
            ]
        ],
        plugins: [
            [
                "@babel/plugin-proposal-decorators",
                {
                    "legacy": true
                }
            ],
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-syntax-dynamic-import",
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            [
                "@babel/plugin-proposal-private-methods",
                {
                    "loose": true
                }
            ]
        ]
    }
}

function configExec(entry, outputFilename) {

    webpack({
        entry,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: outputFilename,
            library: {
                type: 'module'
            },
        },
        experiments: {
            outputModule: true,
        },
        module: {
            rules: [{
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: babelLoader
            }, {
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: babelLoader
            }, {
                test: /\.(png|svg|kpg|gif|jpeg|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'images/[name]_[hash:8].[ext]',
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name]_[hash:8].[ext]',
                    },
                }],
            },
            ]
        },
        mode: "production",
        plugins: [new InstallPlugin({})]
    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log(err, stats.compilation.errors)
        }
    })

}

configExec("./src/index.js", "index.js");
