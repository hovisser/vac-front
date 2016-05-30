/**
* Plugin section
*/
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

/**
* config section
*/
//source folder
var src = './src';
//destination folder
var dest = './dist';

//html files
var html = {
  in: src + '/index.html',
  filename: 'index.html',
  out: dest
}

//javascript files
var js = {
    in: [
        src + '/app/**/*.module.js',
        src + '/app/**/*.js',
        src + '/app/*.js'
    ],
    out: dest + '/scripts',
    filename: src + '/app/app.js',
    outputfilename: 'main.js'
}

// Bootstrap scss source
var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
    };

// Bootstrap fonts source
var fonts = {
        in: [src + '/fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + '/fonts/'
    };

// Our scss source folder: .scss files
var scss = {
    in: src + '/styles/main.scss',
    out: dest + '/css/',
    watch: src + '/styles/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

/**
* Gulp tasks section
*/
// Lint Task
gulp.task('lint', function() {
    return gulp.src(js.in)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});


// Compile Our Sass
gulp.task('sass', ['fonts'], function() {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});

//browserify the require node modules
gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify(js.filename)
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source(js.outputfilename))
        // saves it the public/js/ directory
        .pipe(gulp.dest(js.out));
})

//copy index.html
gulp.task('index', function(){
  return gulp.src(html.in)
      //Copy to dist folder and rename if needed
      .pipe(rename(html.filename))
      .pipe(gulp.dest(html.out));
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(js.in, ['lint', 'browserify']);
    gulp.watch(html.in, ['index']);
    gulp.watch(scss.watch, ['sass']);
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
