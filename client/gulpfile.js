const concat = require('gulp-concat');
const { src, series, parallel, dest, watch } = require('gulp');
const sass = require('gulp-sass'); 
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var browserSync = require('browser-sync').create();


// Paths  src/scss, js, images, html
const files = { 
  htmlPath: "src/**/*.html", 
  scssPath: "src/sass/*.scss", 
  jsPath: "src/**/*.js"
};


// Copy & concatenate all files with .html from 'src' directory to the 'pub' directory
function copyHtml(){
  return src(files.htmlPath)
  .pipe(concat('index.html'))
  .pipe(dest('pub'))
  .pipe(browserSync.stream());
}

// Copy & concatenate all files with .scss from 'src/scss' directory to the 'pub' directory
function copyScss(){
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('pub/css'));
  }

// Copy & concatenate all files with .js from 'src/js' directory to the 'pub' directory
function copyJs(){
  return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write("."))
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream());
}

// Watching for changes in all html, css, js & img files.
function watchTask() {
  watch([files.htmlPath, files.scssPath, files.jsPath], 
    parallel(copyHtml, copyScss, copyJs));
}

/*
This will serve files from the 'pub' directory
and will automatically watch for html/css/js/img changes
*/
browserSync.init({
  watch: true,
  server: "pub"
});

// Exports to the public directory 'pub'
exports.default = series(
    parallel(copyHtml, copyScss, copyJs),
    watchTask
  );
  