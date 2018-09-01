const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const imagemin = require("gulp-imagemin");

const reload = browserSync.reload;
const BROWSER_SYNC_OPTIONS = {
    server: ['src', 'dest'],
    port: 3000,
    open: false
};

gulp.task('sass', function () {
  gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass({
      pretty: true
    }))
    .pipe(gulp.dest('dest'));
});

gulp.task('scss', ['sass'])

gulp.task('pug', () => {
  return gulp.src(['src/pug/*.pug', '!src/pug/_*.pug'])
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>')
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dest'));
});

gulp.task('imagemin', function(){
  gulp.src('src/**/**/*.+(jpg|jpeg|png|gif|svg)')
      .pipe(imagemin())
      .pipe(gulp.dest('dest'));
});

gulp.task('script', function(){
  gulp.src('src/**/*.js')
    .pipe(gulp.dest('dest'));
});

gulp.task('build', ['sass', 'pug', 'imagemin', 'script'])

gulp.task('watch', () => {
  browserSync(BROWSER_SYNC_OPTIONS);

  gulp.watch('src/scss/**/*.scss', ['sass', reload]);
  gulp.watch('src/pug/*.pug', ['pug', reload]);
  gulp.watch('src/images/**/*', ['imagemin', reload]);
});
