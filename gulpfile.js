// generated on 2016-06-30 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const mainBowerFiles = require('main-bower-files');
const gulpFilter = require('gulp-filter');
const debug = require('gulp-debug-streams');

var url = require('url');
var proxy = require('proxy-middleware');



const $ = gulpLoadPlugins();
const reload = browserSync.reload;


gulp.task('styles', () => {
  return gulp.src('app/styles/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

// all htmls but not the index one
gulp.task('tpls', () => {
  return gulp.src('app/**/*.html')
		//.pipe(debug({title: '_________ tpls: '}))
		.pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
		.pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

// handle js (except vendors)
gulp.task('scripts', () => {  
  return gulp.src(['app/scripts/**/*.js','!app/scripts/vendor/*.js'])  
		.pipe($.plumber())
		//.pipe(debug())
		.pipe(gulp.dest('.tmp/scripts'))
    .pipe($.sourcemaps.init())
		.pipe($.babel())		
		.pipe($.uglify())
		//.pipe(debug())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('dist/scripts'));
});

// handle vendors (except modernizr)
// look at bower json config and grab vendors out of it (merge in one folder)
gulp.task('vendors', ['scripts'], () => { 
  var filterJS = gulpFilter(['**/*.js', '!**/modernizr.js'], { restore: true });
	return gulp.src(mainBowerFiles(/*{debugging:true}*/))       
		.pipe(filterJS)
		.pipe($.plumber())
		.pipe(gulp.dest('./app/scripts/vendor'))
		//.pipe(debug())		
		.pipe($.sourcemaps.init())
		.pipe($.uglify())		
		.pipe($.sourcemaps.write('maps'))
		.pipe(filterJS.restore)
		.pipe(gulp.dest('dist/scripts/vendor'));
		
});


// lint js
function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}
gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

// merge found files and inject them in index.html
gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']})) 
		.pipe(debug({title: '_________byHTMLTask:'}))
		//.pipe($.if('*.js', 
		//	$.if('!**/modernizr.js', 
		//		$.if('!**/scripts/vendor/*.js', $.uglify())))
		//)				
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
		//.pipe(debug({title: '_________byHTMLTask:'}))
    .pipe(gulp.dest('dist'));
});

// handle images
gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

// handle fonts
gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// all the rest in root folder (except *.html)
gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  })	
	.pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts', 'extras', 'vendors', 'html', 'scripts', 'tpls'], () => {
//gulp.task('serve', ['scripts'], () => {
  var proxyOptions = url.parse('http://www.pornoesel.com/v1/api');
	proxyOptions.route = '/api';
	
	console.log(proxyOptions);
	
	browserSync({
    notify: true,
    port: 9000,
		reload: false,
		/*reloadDelay: 2000,
		watchOptions: {
			debounceDelay: 2000
		},*/
    server: {
      baseDir: ['.tmp', 'app'],
			middleware: [proxy(proxyOptions)],
			routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);
	
	
	gulp.task('js-watch', ['scripts'], browserSync.reload);

	

	
  gulp.watch('app/styles/**/*.css', ['styles']);
	
	gulp.watch('app/**/*.html', function() {
		setTimeout(function () {
				gulp.start('tpls');
		}, 300);
	});
	
  gulp.watch('app/scripts/**/*.js', function() {
		setTimeout(function () {
				gulp.start('js-watch');
		}, 300);
	});
		
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
//gulp.task('wiredep', () => {
//  gulp.src('app/*.html')
//    .pipe(wiredep({
//      exclude: ['bootstrap.js'],
//      ignorePath: /^(\.\.\/)*\.\./
//    }))
//    .pipe(gulp.dest('app'));
//});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'vendors', 'scripts', 'tpls'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
