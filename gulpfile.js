var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var buildProduction = utilities.env.production;

var lib = require('bower-files')();
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('jshint', () => {
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatInterface', () => {
  return gulp.src(['js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], () => {
  return browserify({entries: ['./tmp/allConcat.js']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], () => {
  return gulp.src('./post-babel/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/app.js'))
});

gulp.task('jsBower', () => {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
});

gulp.task('clean', () => {
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], () => {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('jsBower');
  gulp.start('cssBuild');
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['sass/*.sass'], ['cssBuild']); //NOTE: I might be a bug
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], () => {
  browserSync.reload();
});

gulp.task('bowerBuild', ['jsBower'], () => {
  browserSync.reload();
});

gulp.task('htmlBuild', () => {
  browserSync.reload();
});

gulp.task('cssBuild', () => {
  return gulp.src('sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});
