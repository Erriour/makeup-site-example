const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer'); // Добавление префиксных свойств
const cleanCSS = require('gulp-clean-css'); //Minify CSS
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');
const smartgrid = require('smart-grid');

const config = {
    src: './src',
    css: {
        src: '/row_css/main.less',
        dist: '/css'
    },
    html: {
        src: '/index.html'
    }
};

var settings = {
    outputStyle: 'less',
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: '1200px',
        fields: '30px'
    },
    breakPoints: {
        lg: {
            width: '1100px'
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
    }
};

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});

gulp.task('build', function(){
    smartgrid(config.src + '/row_css', settings);
    gulp.src(config.src + config.css.src)
        .pipe(sourcemaps.init())
        .pipe(preproc())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'], //last 2 versions - какие браузеры поддерживать
            cascade: false
        }))
        .pipe(cleanCSS({level: 2})) //{compatibility: 'ie8'}
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.src + config.css.dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browserSync'], function(){ //gulp watch - запуск фонового изменения файлов
    gulp.watch(config.src + config.css.src, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
});