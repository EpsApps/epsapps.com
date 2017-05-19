const webpack = require('webpack');
const merge = require('webpack-merge');

function configureBuildForDevelopment(baseConfig) {
    const developmentConfig = {
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'WEBPACK_ENV': '"dev"'
            })
        ]
    };
    return merge(baseConfig, developmentConfig);
}
module.exports = configureBuildForDevelopment;