var gulp          = require('gulp'),
    path          = require('path'),
    less          = require('gulp-less'),
    autoprefixer  = require('gulp-autoprefixer'),
    gutil         = require('gulp-util'),
    concat        = require('gulp-concat'),
    coffeeify     = require('gulp-coffeeify'),
    webserver     = require('gulp-webserver');

////// Currently unused
// var uglify        = require('gulp-uglify'),
//     imagemin      = require('gulp-imagemin'),
//     rename        = require('gulp-rename'),
//     cache         = require('gulp-cache'),
//     minifycss     = require('gulp-minify-css'),
//     livereload    = require('gulp-livereload'),
//     sourcemaps    = require('gulp-sourcemaps');

function errorLog (error) {
  console.error(error.message); 
  this.emit('end');
}

var SCRIPTS_PATH = './assets/scripts/**/*.coffee';
var STYLES_PATH  = './assets/less/**/*.less'

gulp.task('styles', function () {
  return gulp.src(STYLES_PATH)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/assets/styles'));
});

gulp.task('scripts', function() {
  return gulp.src('./assets/scripts/app.coffee')
    .pipe(coffeeify())
    .pipe(gulp.dest('public/assets/scripts'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 5678
    }));
});

gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(STYLES_PATH,  ['styles']);
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'watch', 'webserver');
});