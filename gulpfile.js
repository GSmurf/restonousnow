/**
 * @name gulpfile.js
 * @author
 * @description gulp file for the SPA app 
 */

// Loads the modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	streamify = require('gulp-streamify'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	html = require('gulp-html-replace'),
	del = require('del');

// Loads the template transform for underscore
var templates = require('node-underscorify').transform({
	'requires': [{ 'variable': '_', 'module': 'underscore'}]
});

// Application scripts
var init = './app/init';
var scripts = [ 'app/**/*.js', '!app/app.js'];

// Defines the jshint task
gulp.task('lint', function() {
	return gulp.src([ 'gulpfile.js'].concat(scripts))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

// Defines the css task 
gulp.task('css', function() {
	return gulp.src('css/app.css')
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});

// Defines the browserify task 
gulp.task('browserify', [ 'lint' ], function() {
	return browserify(init, { debug: true })
		.transform(templates)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('app'));
});

// Defines the browserify task 
gulp.task('watchify', function() {

	// Sets up the watchify instance
	var b = browserify(init, { debug: true, cache: {}, packageCache: {}, fullPaths: true }),
		watch = watchify(b).transform(templates);

	// Functin that is called when an update was detected
	var rebundle = function() {
		return watch.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('app'))
			.pipe(reload({stream:true}));
	};

	// Sets the onupdate listener and return
	watch.on('update', rebundle);
	return rebundle();
});

// Defines the scripts task 
gulp.task('scripts', [ 'lint' ], function() {
	return browserify(init, { debug: false })
		.transform(templates)
		.bundle()
		.pipe(source('app.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('dist/app'));
});

// Defines the html replace task 
gulp.task('html', function() {
	return gulp.src('index.html')
		.pipe(html({ js: { src: 'app/app.js', tpl: '<script src="%s" async></script>' }}))
		.pipe(gulp.dest('dist/'));
});

// Defines the copy  task 
gulp.task('copy', function() {
	gulp.src('css/fonts/**').pipe(gulp.dest('dist/css/fonts'));
	gulp.src('data/**').pipe(gulp.dest('dist/data'));
	gulp.src('config/**').pipe(gulp.dest('dist/config'));
	return gulp.src('img/**').pipe(gulp.dest('dist/img'));
});

// Defines the scripts task 
gulp.task('clean', function(cb) {
	del([ 'dist' ], cb);
});

// will auto-update browsers
gulp.task('sass', function () {
	return gulp.src('sass/app.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'))
		.pipe(reload({stream:true}));
});

// Static server task
gulp.task('browser-sync', function() {
	browserSync({
		port: 9000,
		server: {
			baseDir: './',
		}
	});
});

// Reload all Browsers
gulp.task('reload', function () {
	browserSync.reload();
});

// Defines a task to open the application in a static server (without browser-sync)
gulp.task('server', function() {
	connect.server({
		port: 9000
	});
});

// Defines the build task
gulp.task('build', [ 'clean', 'sass' ], function() {
	gulp.start('scripts', 'css', 'html', 'copy');
});

// Defines the default task
gulp.task('default', [ 'sass', 'browserify', 'browser-sync' ], function() {
	gulp.watch('sass/**/*.scss', [ 'sass' ]);
	gulp.watch('index.html', [ 'reload' ]);
	gulp.start('watchify');
});