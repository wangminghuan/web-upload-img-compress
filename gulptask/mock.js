// 暂时无用
var gulp = require('gulp');
var mockServer = require('gulp-mock-server');

gulp.task('mock', function() {
  gulp.src('.')
    .pipe(mockServer({
      port: 3000,//可修改
      mockDir: './server'
    }));
});
