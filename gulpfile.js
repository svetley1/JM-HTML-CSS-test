const gulp = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemap = require('gulp-sourcemaps');

const server = require("browser-sync").create();

function buildCss() {
  return gulp.src('sass/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('style'));
}

function runServer() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.scss', buildCss).on('change', server.reload);
  gulp.watch('**/*.html').on('change', server.reload);
  gulp.watch('images/**/*{png,jpg,svg}').on('change', server.reload);
  gulp.watch(['fonts/**/*.{woff, woff2}']).on('change', server.reload);
}

const serve = gulp.series(runServer);
const build = gulp.series(buildCss);

exports.build = build;
exports.serve = serve;
exports.start = gulp.series(
  build,
  serve
);
