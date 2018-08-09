let gulp = require("gulp");
const tar = require("gulp-tar");
let gzip = require("gulp-gzip");

gulp.task("ngzip", function() {
  gulp
    .src("build/tar/**")
    .pipe(tar("water.service.tar"))
    .pipe(gzip())
    .pipe(gulp.dest("./build"));
});
