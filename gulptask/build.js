var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'); //png图片压缩插件

//引入文件路径配置
var filePath = require("../config.js");

gulp.task('uglify-js', ['optimize-js'], function() {
  return gulp.src(filePath.build + "/js/*.js")
  .pipe(uglify())//不需要压缩请注释掉本行
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(filePath.publicPath + "/js/"))

});

gulp.task('uglify-css', ['optimize-sass'], function() {
  return gulp.src(filePath.build + "/css/*.css")
  .pipe(cleanCss())//不需要压缩请注释掉本行
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(filePath.publicPath + "/css/"))
});

gulp.task('compress-img', function() {
  return gulp.src(filePath.IMGPath + "/*.{png,jpg,gif}")
  .pipe(imagemin({
    progressive: true, //无损压缩
    use: [pngquant()] //使用pngquant来压缩png图片
  }))
  .pipe(gulp.dest(filePath.publicPath + "/img/"))
});

gulp.task('build-task', ['uglify-js', 'uglify-css', 'compress-img']);
