var gulp = require('gulp');
    scss = require('gulp-scss');
    postcss = require('gulp-postcss');
    precss = require('precss');
    rename = require('gulp-rename');
    sourcemaps = require('gulp-sourcemaps');
    cssnano = require('cssnano');
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require('browser-sync').create();
    reload = browserSync.reload;
    customMedia = require("postcss-custom-media")
    map = require('postcss-map');
    conditionals = require('postcss-conditionals');
    mixins = require('postcss-mixins');
    simplevars = require('postcss-simple-vars');
    nested = require('postcss-nested');


const dirs = {
  src: 'src',
  dest: 'dist',
};

const cssPaths = {
  srcFiles: `${dirs.src}/main.css`,
  destDir: `${dirs.dest}/css/`,
}

var breakpoints = {
  basePath: 'src/',
  maps: ['breakpoints.yml']
};




gulp.task('css', function() {
  var processors = [
    precss,
    map(breakpoints),
    simplevars,
    conditionals,
    autoprefixer,
    cssnano
  ];


  return gulp.src(cssPaths.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(cssPaths.destDir));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('src/*.css', ['css', browserSync.reload]);
  gulp.watch("*/*.html", browserSync.reload);
});

gulp.task('default', ['css', 'browser-sync', 'watch']);
