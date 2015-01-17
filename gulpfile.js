var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var bundler = watchify(browserify('./index.js', watchify.args));
// add any other browserify options or transforms here
bundler.transform('brfs');

gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('ecos.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
}
