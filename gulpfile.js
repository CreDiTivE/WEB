var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat 		 = require('gulp-concat'),
	concatcss 	 = require('gulp-concat-css'),
	uglify 		 = require('gulp-uglify'),
	cssnano 	 = require('gulp-cssnano'),
	rename 		 = require('gulp-rename'),
	del 		 = require('del'),
	cache 		 = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

/* --------------------- Work with preprocessor files ----------------------------------- */

gulp.task('sass', function() {
	return gulp.src(['src/sass/**/*.sass', 'src/sass/**/*.scss'])
	.pipe(sass({outputStyle: 'expanded'}).on('error',sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}))
});

/* --------------------- Minifying js files ----------------------------------- */

gulp.task('scripts', function(){
	return gulp.src([
		'src/js/main.js',
	])
	.pipe(concat('bundle.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

/* --------------------- Minifying js libraries ----------------------------------- */

gulp.task('scripts-libs', function(){
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'src/libs/lazysizes/lazysizes.min.js'
		/*'src/libs/bootstrap4/dist/js/bootstrap.min.js'*/
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

/* --------------------- Minifying css files ----------------------------------- */

gulp.task('css-files', ['sass'], function(){
	return gulp.src([
		'src/css/main.css',
		'src/css/menu.css'
	])
	.pipe(concatcss('bundle.css'))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'));
});

/* --------------------- Minifying css libraries -------------------------------- */

gulp.task('css-libs', ['sass'], function(){
	return gulp.src('src/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'));
});

/* ----------------- Project synchronization in the browser  ----------------------- */

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		nofity: false
	});
});

/* --------------------- Delete project folder  --------------------------------- */

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return del.clearAll();
});

/* --------------------- Work with images  --------------------------------- */

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

/* --------------------- Browser automatically updating --------------------------------- */

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

/* --------------------- Building the project --------------------------------- */

gulp.task('build', ['clean','img','css-files', 'css-libs','scripts','scripts-libs'], function() {

	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildCss = gulp.src([
		//'src/css/main.css',
		//'src/css/menu.css',
		'src/css/bundle.min.css', 
		'src/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'src/js/libs.min.js', 
		'src/js/bundle.min.js'
	])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});