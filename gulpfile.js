var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:8081",
        browser:"google chrome"
    });
});

gulp.task('less',function(){
    return gulp.src('./public/less/**/*.less')
        .pipe(less({
            paths:[path.join(__dirname,'less','includes')]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['less','browser-sync'], function() {
    gulp.watch(['./views/**/*.jade'], browserSync.reload);
    gulp.watch(['./views/*.jade'], browserSync.reload);
    gulp.watch(['./public/css/**/*.css'], browserSync.reload);
    gulp.watch("./public/less/**/*.less", ['less']);
    gulp.watch("./public/less/*.less", ['less']);
});
