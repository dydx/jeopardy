var gulp = require('gulp')
var sass = require('gulp-sass')
var browserify = require('gulp-browserify')

gulp.task('sass', function () {
  gulp.src('build/sass/main.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').with(require('node-neat').includePaths)
    }))
    .pipe(gulp.dest('app/css/'))
})

gulp.task('javascript', function () {
  gulp.src('build/js/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('app/js'));
})

gulp.task('default', ['sass', 'javascript'])
