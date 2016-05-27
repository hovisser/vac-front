// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var src = './src';
var dest = './dist';
var config = {
  jspaths: [
      src + '/app/**/*.module.js',
      src + '/app/**/*.js',
      src + '/app/*.js'
  ],
  stylespaths: [
      src + '/styles/*.scss'
  ],
  stylesdest: dest + '/css',
  jsdest: dest + '/scripts'
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src(config.jspaths)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(config.stylespaths)
        .pipe(sass())
        .pipe(gulp.dest(config.stylesdest));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(config.jspaths)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dest))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsdest));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(config.jspaths, ['lint', 'scripts']);
    gulp.watch(config.stylespaths, ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
