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

var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-terminal-reporter');

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

var test = {
  in: src + '/app/**/*.spec.js'
}

//javascript files
var js = {
    in: [
        src + '/app/**/*.module.js',
        src + '/app/**/*.js',
        src + '/app/app.js',
        '!' + test.in
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
var static = {
  in: src + '/static/**/*',
  out: dest
}
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


var templates = {
  in: src + '/app/templates/**/*.tpl.html',
  out: dest + '/scripts/',
  prefix: 'templates/',
  filename: 'templates.js'
}


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


gulp.task('test', function(){
    gulp.src(test.in)
      .pipe(jasmine({
        reporter: new reporters()
      }));
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

gulp.task('static', function(){
    gulp.src(static.in)
        .pipe(gulp.dest(static.out));
});


gulp.task('templates', function () {
  return gulp.src(templates.in)
    .pipe(templateCache(templates.filename, {root: templates.prefix, transformUrl: function(url) {
      return url.replace(/\.tpl\.html$/, '.html') }
    }))
    .pipe(gulp.dest(templates.out));
});

/*gulp.task('templates', function(){
    return gulp.src('/app/templates/*.tpl.html')
        //Let this plugin do it's magic and convert all templates to a js cache file
        .pipe(angularTemplatecache())
        //Move the final file to a destination folder
        .pipe(rename('templateCache.js'))
        .pipe(gulp.dest('./dist/scripts'));
});*/


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(templates.in, ['templates']);
    gulp.watch(test.in, ['test']);
    gulp.watch(js.in, [ 'test','lint', 'browserify']);
    gulp.watch(html.in, ['index']);
    gulp.watch(static.in, ['static']);
    gulp.watch(scss.watch, ['sass']);
});


// Default Task
gulp.task('build', ['test', 'lint', 'sass', 'browserify', 'static', 'templates', 'watch', 'index']);

gulp.task('connect', function () {
    gulp.start('build');
    connect.server({
        root: dest,
        port: 4000
    })
});
