var usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    gzip = require('gulp-gzip'),
    rev = require('gulp-rev'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
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
  gulp.src('./app/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  var watch = gulp.watch(['./app/**/*'], ['reload']);
});

gulp.task("compress", function() {
    gulp.src(["build/javascripts/*.js"])
    .pipe(gzip())
    .pipe(gulp.dest("build/javascripts/"));

    gulp.src(["build/*.html"])
    .pipe(gzip())
    .pipe(gulp.dest("build/"));

    gulp.src(["build/styles/*.css"])
    .pipe(gzip())
    .pipe(gulp.dest("build/styles/"));
});

gulp.task('clean', function () {
  return gulp.src('build/', {read: false})
    .pipe(clean());
});


gulp.task('build', ['clean', 'usemin', 'compress']);
