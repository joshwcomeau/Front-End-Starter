var gulp          = require('gulp'),
    path          = require('path'),
    less          = require('gulp-less'),
    coffee        = require('gulp-coffee'),
    autoprefixer  = require('gulp-autoprefixer'),
    jshint        = require('gulp-jshint'),
    gutil         = require('gulp-util'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    cache         = require('gulp-cache'),

    minifycss     = require('gulp-minify-css'),
    
    livereload    = require('gulp-livereload'),
    sourcemaps    = require('gulp-sourcemaps');

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
  return gulp.src([SCRIPTS_PATH])
    .pipe( coffee({ bare: true })).on('error', gutil.log)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // .on('error', errorLog)
    .pipe(gulp.dest('public/assets/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(STYLES_PATH,  ['styles']);
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'watch');
});