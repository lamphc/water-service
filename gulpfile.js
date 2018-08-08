let gulp = require("gulp");
const tar = require("gulp-tar");
let gzip = require("gulp-gzip");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");

gulp.task("ngzip", function() {
  gulp
    .src("build/tar/**")
    .pipe(tar("water.service.tar"))
    .pipe(gzip())
    .pipe(gulp.dest("./build"));
});

gulp.task("default", function() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build/tar/ws"));
});
