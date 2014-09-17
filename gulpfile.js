var gulp        = require("gulp");
var browserify  = require("gulp-browserify");
var cssshrink   = require("gulp-cssshrink");
var livereload  = require("gulp-livereload");
var sass        = require("gulp-sass");
var reactify    = require("reactify");
var autoprefixer= require("gulp-autoprefixer");
var rename      = require("gulp-rename");

var karma = require("karma").server;

gulp.task('sass', function() {
  gulp.src('app/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/styles/'))
    .pipe(livereload());
});

gulp.task('browserify', function() {
  gulp.src('app/javascripts/index.js')
    .pipe(browserify({ transform: 'reactify' }))
    .pipe(rename(function (path) {
      path.basename = "bundle-" + path.basename;
    }))
    .pipe(gulp.dest('app/javascripts/'))
    .pipe(livereload());
});

gulp.task('precompile-tests', function() {
  gulp.src('tests/js/jsTests.js')
    .pipe(browserify({ transform: 'reactify' }))
    .pipe(rename(function (path) {
      path.basename = "bundle-" + path.basename;
    }))
    .pipe(gulp.dest('tests/js/'));
});

gulp.task('tests', function() {
  return gulp.src('app/javascripts/bundle-index.js')
    .pipe(karma.start({
      configFile: __dirname + '/my.conf.js',
      singleRun: false
    }));
});

gulp.task('watch', function() {
  livereload();

  gulp.watch(['app/styles/**/*.scss'], ['sass']);
  gulp.watch(['app/javascripts/**/*.js', '!app/javascripts/bundle-index.js'], ['browserify', 'tests']);
  gulp.watch(['tests/**/*Spec.js'], ['precompile-tests']);
});

gulp.task('default', ['watch']);