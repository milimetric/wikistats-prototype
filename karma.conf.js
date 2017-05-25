const webpackConfig = require('./webpack.config.js');

const testConfiguration = {
    browsers: ['Chrome'],

    frameworks: ['jasmine'],

    files: [
        './test/index.js'
    ],

    webpack: webpackConfig,

    preprocessors: {
        'test/index.js': ['webpack']
    }
}

module.exports = function (config) {
    config.set(testConfiguration)
    return config;
}