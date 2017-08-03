var gulp = require('gulp'),
  babel = require('gulp-babel'),
  rollup = require("gulp-rollup"),
  concat = require('gulp-concat'),
  rename = require("gulp-rename"),
  inject = require('gulp-inject'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  autoprefixer = require("gulp-autoprefixer"),
  sass = require('gulp-sass'),
  cssimport = require("gulp-cssimport"),
  filePath = require("../config.js");

gulp.task('optimize-js', function() {
  return gulp.src([
    filePath.entry, filePath.JSPath + "/*.js"
  ])
  //.pipe(webpack(require('./webpack.config.js')))
  //也可以使用webpack对文件进行处理，通过webpack中的babel-loader跟output就可以省去下面的所有处理流程
  //选用rollup插件处理模块化
 .pipe(rollup({entry: filePath.entry, format: 'iife'}))
 .pipe(babel())
 .pipe(gulp.dest(filePath.build + '/js'))

});

gulp.task('optimize-sass', function() {
  return gulp.src(filePath.CSSPath + "/index.scss")
  .pipe(cssimport({}))
  .pipe(sass({/*outputStyle: 'compressed'*/}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: [
      'last 2 versions', 'Android >= 4.0'
    ],
    cascade: true, //是否美化属性值 默认：true 像这样：
    //-webkit-transform: rotate(45deg);
    //        transform: rotate(45deg);
    remove: true //是否去掉不必要的前缀 默认：tr
  }))
  .pipe(concat('index.css'))
  .pipe(gulp.dest(filePath.build + '/css'))
  .pipe(reload({stream: true}));
});

//如果模板路径变动，请在此处修改 入口&&出口
gulp.task('inject-js-css', ['optimize-js', 'optimize-sass'], function() {
  var target = gulp.src('index.html'); //模板入口资源
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    filePath.build + '/js/*.js',
    filePath.build + '/css/*.css'
  ], {read: false});
  return target.pipe(inject(sources))
  .pipe(gulp.dest('./')); //模版输出路径
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('watch-js', ['optimize-js'], browserSync.reload);

// 静态服务器 + 监听 scss/html 文件
var port=8000;
gulp.task('watch-build-task', ['inject-js-css'], function() {
  browserSync.init({
    port: port,
    server: {
      baseDir: ''
    }
  });
  gulp.watch([filePath.entry, filePath.JSPath + '/*.js'], ['watch-js']);
  gulp.watch(filePath.CSSPath + '/*.scss', ['optimize-sass']);
  gulp.watch(['*.html', filePath.HTMLPath + '/*.html']).on('change', reload);
});
