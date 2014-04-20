var usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    gulp = require('gulp'),
    connect = require('gulp-connect');

// Live reload
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('usemin', function() {
  gulp.src('./app/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('reload', function () {
  gulp.src('./app/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  var watch = gulp.watch(['./app/*'], ['reload']);
});

gulp.task('build', ['usemin']);
