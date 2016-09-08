'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');
var sassLint = require('gulp-sass-lint');

var injectDependencies = function() {
  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
      path.join(conf.paths.src, '/app/index.scss')
    ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')));
};

var buildStyles = function () {
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src([
      path.join(conf.paths.src, '/app/index.scss')
    ])
    .pipe($.compass({
      css: conf.paths.compassTmp,
      sass: 'src/app'
    }))
    .pipe(cssFilter)
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', ['styles:inject-dependencies'], function() {
  return buildStyles();
});

gulp.task('styles:inject-dependencies', function() {
  return injectDependencies();
});

gulp.task('styles:lint', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.scss'))
    .pipe(sassLint({
      config: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on('error', conf.errorHandler('Autoprefixer'));
});
