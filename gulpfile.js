'use strict';

var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var sass        = require('gulp-sass');
var watch       = require('gulp-watch');
var browserify  = require('browserify'); // allows you to require modules on the client side
var babelify    = require('babelify'); //using babelify to transform react
var source      = require('vinyl-source-stream');

gulp.task('Nodemon', restartServer);

gulp.task('compile-sass', function(){
    console.log('compiling scss');
    gulp.src('./public/styles/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/styles'))
});

gulp.task('sass-watch', function(){
    gulp.watch(['./public/styles/*.scss'], ['compile-sass']);
});

gulp.task('watch-react', function(){
    gulp.watch(['./clientReact/*.js'], ['react'])
});

gulp.task('react', function(){
    return browserify('./clientReact/app.js')
        .transform('babelify', {presets: ['react']})
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./public/scripts'))
});

function restartServer() {
    nodemon({
        script: './bin/www',
        ext: 'js hbs scss sql'
    });
}

gulp.task('default', ['react', 'watch-react', 'sass-watch', 'Nodemon']);