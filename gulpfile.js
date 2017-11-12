var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');


var serverFiles = "src/server/**/*.ts";
var commonFiles = "src/common/**/*.ts";
var clientFiles = "src/client/**/*.ts";

var serverCollection = [serverFiles,commonFiles];
var clientCollection = [clientFiles,commonFiles];
//var tsServerProject = ts.createProject('tsconfig.json');

var tsServerProject = ts.createProject({
  module: "commonjs",
  noImplicitAny:true,
  rootDir:"./src",
  outDir:"./build",
  target:"es5"
});

gulp.task('buildServer', function(){  
 // return tsServerProject.src()
 return gulp.src(serverCollection, {base:"./src"})
    .pipe(sourcemaps.init())
    .pipe(tsServerProject())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot:"." }))
    .pipe(gulp.dest('build'));
});
 
                                           
var tsClientProject  = ts.createProject({
  module: "amd",
  noImplicitAny:true,
  outFile:'client.js',
  target:"es5", 
  files: []
});

gulp.task('buildClient', function(){  
  return gulp.src(clientCollection)
    .pipe(sourcemaps.init())
    .pipe(tsClientProject())
    .pipe(sourcemaps.write({ sourceRoot:"." }))
    .pipe(gulp.dest('public/script'));
});


gulp.task('watch', ['buildClient','buildServer'], function(){
  gulp.watch(serverFiles,['buildServer']);
  gulp.watch(clientFiles,['buildClient']);
  gulp.watch(commonFiles,['buildClient', 'buildServer']);
});


gulp.task('default', ['buildServer', 'buildClient', 'watch']);