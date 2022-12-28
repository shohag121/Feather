const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: false,
    mode: "development",
    devServer: {
        static: './examples',
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*', 'examples/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/dist/',
    },
    optimization: {
        runtimeChunk: false,
    },
};