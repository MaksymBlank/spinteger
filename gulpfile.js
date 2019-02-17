var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browser = require('browser-sync');
var rimraf = require('rimraf');

gulp.task('pug', function(){
    return gulp.src('views/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
    return gulp.src('source/styles/main.scss')
        .pipe(sass({
            outputStyle: 'main.min.css'
        })).on('error', sass.logError)
        .pipe(gulp.dest('build/css'));
});

gulp.task('rm', function(rf){
    return rimraf('build', rf);
});

gulp.task('watch', function(){
    // gulp.watch('source/template/**/*.pug', ['pug']);
    gulp.watch('source/styles/**/*.scss', ['sass']);
    gulp.watch('source/js/**/*.js', ['js'])
})

gulp.task('images', function(){
    return gulp.src('source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
})

gulp.task('js', function(){
    return gulp.src('source/js/**/*.js')
        .pipe(gulp.dest('build/js'));
})

gulp.task('default', [
    // 'server',
    'watch',
    'rm',
    'js',
    'images',
    'pug',
    'sass'
]);

