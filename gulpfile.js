// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var src = './src';
var dest = './dist';

var config = {
  indexpath: src + '/index.html',
  jspaths: [
      src + '/app/**/*.module.js',
      src + '/app/**/*.js',
      src + '/app/*.js'
  ],
  stylespaths: [
      src + '/styles/*.scss'
  ],
  indexdest: dest,
  stylesdest: dest + '/css',
  jsdest: dest + '/scripts',
  indexfilename: 'index.html'
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

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./src/app/front.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./dist/scripts/'));
})


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(config.jspaths)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dest))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsdest));
});



//copy index.html
gulp.task('index', function(){
  return gulp.src(config.indexpath)
      //Copy to dist folder and rename if needed
      .pipe(rename(config.indexfilename))
      .pipe(gulp.dest(config.indexdest));
})


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(config.jspaths, ['lint', 'browserify']);
    gulp.watch(config.indexpath, ['index']);
    gulp.watch(config.stylespaths, ['sass']);
});

// Default Task
gulp.task('build', ['lint', 'sass', 'browserify', 'watch', 'index']);

gulp.task('connect', function () {
    gulp.start('build');
    connect.server({
        root: dest,
        port: 4000
    })
});
