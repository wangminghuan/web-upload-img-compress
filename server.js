var express = require('express');
var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

var server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: "./",
    hot: true,　　//开启热调试
    inline: true,
    historyApiFallback: true,
    compress: true,
    stats: {
        colors: true
    }
});
server.listen(3001, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('listening at localhost:3001...');
});





// var app = express();

// // webpack编译器
// var compiler = webpack(webpackConfig);

// // webpack-dev-server中间件
// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//     contentBase: "/",
//     hot: true,
//     inline: true,
//     historyApiFallback: true,
//     stats: {
//         colors: true
//     }
// });
// //中间件热加载
// var hotMiddleware = require('webpack-hot-middleware')(compiler);

// app.use(devMiddleware);
// app.use(hotMiddleware);
// //设置静态文件资源目录
// app.use(express.static(path.join(__dirname, 'client')));

// // 路由
// app.get('/', function(req, res) {
//     res.sendFile( __dirname + "/" + "index.html" );
// });
// //其他模板文件会直接进去根目录下的view/去查找
// app.get('/:viewname?', function (req, res) {
//     var viewname = req.params.viewname ? req.params.viewname + '.html' : 'index.html';
//     res.sendFile( __dirname + "/view/" + viewname );
// });

// var port = 3001;
// module.exports = app.listen(port, function(err) {
//     if (err) {
//         return console.error(err);
//     }

//     console.log('Listening at http://localhost:' + port + '\n')
// })