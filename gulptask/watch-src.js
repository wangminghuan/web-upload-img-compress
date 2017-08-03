var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    inject = require('gulp-inject');


var filePath = require("../config.js");

gulp.task('reload-css', function() {
    return gulp.src(filePath.CSSPath + "/*.css")
        .pipe(reload({ stream: true }));
});

//如果模板路径变动，请在此处修改 入口&&出口
gulp.task('inject-css-js', function() {
    var target = gulp.src('index.html'); //模板入口资源
    var sources = gulp.src([filePath.entry, filePath.JSPath + '/*.js', filePath.JSPath + '/**/*.js', filePath.CSSPath + '/*.css'], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./')); //模版输出路径
});
// 静态服务器 + 监听 scss/html 文件
gulp.task('watch-src-task', ['reload-css', "inject-css-js"], function() {
    browserSync.init({
        port: 8001,
        server: {
            baseDir: ''
        }
    });
    gulp.watch([filePath.entry, filePath.JSPath + '/*.js', filePath.JSPath + '/**/*.js'], browserSync.reload);
    gulp.watch(filePath.CSSPath + '/*.css', ['reload-css']);
    gulp.watch(['*.html', filePath.HTMLPath + '/*.html']).on('change', reload);
});
