let gulp = require("gulp");
const tar = require("gulp-tar");
let gzip = require("gulp-gzip");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");
let gulpCopy = require("gulp-copy");

gulp.task("ngzip", function() {
  gulp
    .src("build/tar/**")
    .pipe(tar("water.service.tar"))
    .pipe(gzip())
    .pipe(gulp.dest("./build"));
});

gulp.task("ncopy", function() {
  return gulp.src("src/**").pipe(gulp.dest("build/tar/ws"));
});

gulp.task("default", ["ncopy", "ngzip"]);
