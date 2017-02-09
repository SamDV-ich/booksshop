const gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    sequence = require('gulp-sequence').use(gulp),
    browserSync = require('browser-sync').create(),
    serverConf = require('./config/config'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    LessAutoPrefixPlugin = require('less-plugin-autoprefix');

const clientDir = './' + serverConf.config.client.dir + '/',
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
gulp.task('less', function() {
    gulp.src(clientDir + 'less/*.less')
        .pipe(less({
            plugins : [
                new LessAutoPrefixPlugin({ browsers: ['last 2 versions'] })
            ]
        }))
        .pipe(gulp.dest(buildPath + '/assets/css'));
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
    sequence('del-dev', 'copy-dev', 'dev-async')(cb);
});

gulp.task('dev-async', ['ts-client', 'less']);

gulp.task('watch', ['sequence'], function() {
    browserSync.init({
        proxy: serverConf.config.server.host + ':' + serverConf.config.server.port
    });

    watch(clientDir + 'app/**/*.ts', (e) => {
        log(e);
        gulp.src([e.path], {base: clientDir}).pipe(ts(tscOptions)).pipe(gulp.dest(buildPath));
        browserSync.reload();
    });

    watch(['**/*.html', '!client/dev/**/*'], (e) => {
        log(e);
        gulp.src([e.path], {base: clientDir}).pipe(gulp.dest(buildPath));
        browserSync.reload();
    });

    watch([clientDir + 'less/*.less'], (e) => {
        log(e);
        gulp.src([e.path])
            .pipe(less({
                plugins : [
                    new LessAutoPrefixPlugin({ browsers: ['last 2 versions'] })
                ]
            }))
            .pipe(gulp.dest(buildPath + '/assets/css'));

        browserSync.reload()
    })
});

function log(e) {
    console.log('File changed: ' + e.path);
}