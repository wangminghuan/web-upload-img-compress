//暂时无用
var gulp = require('gulp');
// var spritesmith = require('gulp.spritesmith');
//var spriter = require('gulp-css-spriter');
//引入文件路径配置
var filePath = require("../config.js");

//生成雪碧图配置
// gulp.task('sprite-task', function() {
//     return gulp.src(filePath.IMGPath + "/s-*.{png,jpg,gif}") //需要合并的图片地址
//         .pipe(spritesmith({
//             imgName: 'sprite.png', //保存合并后图片的地址
//             cssName: 'sprite-style.css', //保存合并后对于css样式的地址
//             padding: 5, //合并时两个图片的间距
//             algorithm: 'binary-tree', // 图片排列，默认即可
//             cssTemplate: function(data) { //css样式模板
//                 var arr = [];
//                 data.sprites.forEach(function(sprite) {
//                     arr.push(".icon-" + sprite.name +
//                         "{" +
//                         "background-image: url('" + sprite.escaped_image + "');" +
//                         "background-position: " + sprite.px.offset_x + "px " + sprite.px.offset_y + "px;" +
//                         "width:" + sprite.px.width + ";" +
//                         "height:" + sprite.px.height + ";" +
//                         "}\n");
//                 });
//                 return arr.join("");
//             }
//
//         }))
//         .pipe(gulp.dest(filePath.build + "/img/")); //最终雪碧图&样式输出位置
// });
