const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();

const webpackStream = require('webpack-stream');
const webpack = require('webpack');

gulp.task('js', () => {
  return gulp.src('app/app.js')
    .pipe(webpackStream(require('./webpack.dev.js'), webpack))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('build:js', () => {
  return gulp.src('app/app.js')
    .pipe(webpackStream(require('./webpack.prod.js'), webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {

});

gulp.task('clean', () => {
  return gulp.src(['.tmp/', 'dist/', '*.zip'], { read: false })
    .pipe($.rimraf({
      force: true
    }));
});

gulp.task('serve', () => {
  runSequence(['js', 'extras']);
});

gulp.task('build', () => {
  return runSequence(['build:js', 'extras'], () => {
    return gulp.src('dist/**/*');
  });
});

gulp.task('default', ['clean'], () => {
  return gulp.start('build');
});
