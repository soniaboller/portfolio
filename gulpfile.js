'use strict';

var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var sass        = require('gulp-sass');
var watch       = require('gulp-watch');

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

function restartServer() {
    nodemon({
        script: './bin/www',
        ext: 'js hbs scss sql'
    });
}

gulp.task('default', ['sass-watch', 'Nodemon']);