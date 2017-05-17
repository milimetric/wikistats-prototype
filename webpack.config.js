var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        // vue-loader isn't compiling templates with the
        // default version of vue
        alias: {
            'vue$': 'vue/dist/vue.esm.js' 
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    }
}
