var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function(){
    gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('minjs'));
    console.log("files minified");
});

gulp.task('styles', function(){
    console.log('runs styles');
});

// The JS used by your website will ALWAYS be minified this way :D
// On file change it will minify the javascript on change i.e. when you save the changes to file
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
