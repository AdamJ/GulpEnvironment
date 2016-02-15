// Gulp dependencies - installed via package.json
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var merge = require('merge-stream');


// Folders & Library Components
var src = 'build/';
var dest = 'deploy/';
var bootstrap = 'bower_components/bootstrap/';
var jquery = 'bower_components/jquery/';


// Clean Build Directory
 gulp.task('clean', function() {
     var node = gulp.src(['node_modules/gulp-sass', 'node_modules/lodash'], {read: false} )
         .pipe(clean({force: true}));
     var deploy = gulp.src('deploy/**', { read: false } )
         .pipe(clean({force: true}));

    return merge(node);
 });

gulp.task('sass', function() {
    return gulp.src(src + 'scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('jolicoeur.min.css'))
        .pipe(minifycss('jolicoeur.min.css'))
        .pipe(gulp.dest(dest + 'css/'));
});

// Move Bootstrap
gulp.task('bootstrap', function() {
    var css = gulp.src(bootstrap + 'dist/css/*.css')
        .pipe(gulp.dest(dest + 'css'));
    var js = gulp.src(bootstrap + 'dist/js/bootstrap.min.js')
        .pipe(gulp.dest(dest + 'js'));
    var font = gulp.src(bootstrap + 'dist/fonts')
        .pipe(gulp.dest(dest + 'fonts'));

    return merge(css, js, font);
});

// Move images / jquery / javascript
gulp.task('move', function() {
    var images = gulp.src(src + 'images/**')
        .pipe(gulp.dest(dest + 'img'));
    var jq = gulp.src(jquery + 'dist/**')
        .pipe(gulp.dest(dest + 'jquery/'));
    var js = gulp.src(src + 'js/')
        .pipe(gulp.dest(dest + 'js/'));
    var html = gulp.src(src + '*.html')
        .pipe(gulp.dest(dest));

    return merge(images, jq, js, html);
});

// Watch for changes in files
gulp.task('watch', function() {
    gulp.watch(src + 'scss/**', ['sass']);
    gulp.watch(bootstrap, ['move']);
    gulp.watch(src + '*.html', ['move:other']);
});

// Default Task - runs all tasks
gulp.task('default', ['sass', 'bootstrap', 'move'], function() {

});