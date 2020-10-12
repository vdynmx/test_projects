// eslint-disable-next-line no-undef
const path = require('path'); // imports the path package, this build paths for us

module.exports = {
    mode: 'development',
    entry: './src/app.js', //location of the entry file as it relates to webpack.config.js 
    output: {
        filename: 'app.js', //bundledcode file
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/' // tells webpack where the files should be located at build
    },
    devServer: {
        
    }
};