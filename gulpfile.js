const gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    sequence = require('gulp-sequence').use(gulp),
    browserSync = require('browser-sync').create(),
    serverConf = require('./config/config');

const clientDir = serverConf.config.client.dir + '/',
    buildPath = clientDir + serverConf.config.client.devDir;

let tscOptions = {
    // target: 'ES5',
    // module: 'es6',
    // moduleResolution: 'node',
    sourceMap: true,
    // emitDecoratorMetadata: false,
    // experimentalDecorators: true,
    // removeComments: true,
    // noImplicitAny: true,
    // noLib : true,
    experimentalDecorators : true,
    project : clientDir + "tsconfig.json"
};

gulp.task('styles', function() {

});

gulp.task('scripts', function() {

});

gulp.task('build', ['scripts', 'styles']);

gulp.task('ts-client', function(cb) {
    gulp.src([clientDir + 'app/**/*.ts'], {base:clientDir})
        .pipe(ts(tscOptions))
        .pipe(gulp.dest(buildPath));
    cb();
});

gulp.task('del-dev', function(cb) {
    del.sync(buildPath);
    cb();
});

gulp.task('copy-dev', function(cb) {
   gulp.src(
       [
           '!' + buildPath * '/**/*',
           clientDir + 'assets/**/*',
           clientDir + 'systemjs.config.js',
           clientDir + '**/*.html',
       ],
       {base: clientDir}
   )
   .pipe(gulp.dest(buildPath));

   gulp.src(
       [
           'node_modules/core-js/client/shim.min.js',
           'node_modules/zone.js/dist/zone.js',
           'node_modules/systemjs/dist/system.src.js',
       ]
   )
   .pipe(gulp.dest(buildPath + '/assets'));

   cb();
});

gulp.task('sequence', (cb) => {
    sequence('del-dev', 'copy-dev', 'ts-client')(cb);
});

gulp.task('watch', ['sequence'], function() {
    browserSync.init({
        proxy: serverConf.config.server.host + ':' + serverConf.config.server.port
    });

    let res = gulp.watch(clientDir + 'app/**.ts');

    res.on('change', function(event) {
        gulp.src(['!' + buildPath * '/**/*', event.path], {base: clientDir}).pipe(ts(tscOptions))
            .pipe(gulp.dest(buildPath));
        console.log('File ' + event.path + ' was ' + event.type);
        browserSync.reload();
    });

    let html = gulp.watch(['!' + buildPath * '/**/*' , clientDir + '**/*.html']);

    html.on('change', function(event) {
        gulp.src(event.path, {base:clientDir}).pipe(gulp.dest(buildPath));
        console.log('File ' + event.path + ' was ' + event.type);
        browserSync.reload();
    });
});