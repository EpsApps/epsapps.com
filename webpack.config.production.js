const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function configureBuildForProduction(baseConfig) {
    const producitonConfig = {
        devtool: 'hidden-source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                comments: false,
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                'WEBPACK_ENV': '"production"'
            }),
            new CopyWebpackPlugin([{ from: path.resolve(__dirname, './src/index.html'), }], {})
        ]
    };
    return merge(baseConfig, producitonConfig);
}
module.exports = configureBuildForProduction;