module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            {
                pattern: 'test/*.spec.js',
                watched: false
            },
            {
                pattern: 'test/**/*.spec.js',
                watched: false
            }
        ]
    })
    return config;
}