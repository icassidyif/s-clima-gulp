// Підключення плагінів-----------------------------------------------------
const { src, dest, watch, series, parallel } = require('gulp');
const fs = require('fs');
const sass = require('gulp-sass');
const groupmedia = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();
const pug = require('gulp-pug');
const prettyHtml = require('gulp-pretty-html');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const include = require('gulp-include');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require("gulp-webpcss");
const svgsprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const babel = require("gulp-babel");
const realFavicon = require ('gulp-real-favicon');
const tildeImporter = require('node-sass-tilde-importer');
const plumberNotifier = require('gulp-plumber-notifier');
const changed = require('gulp-changed');
//--------------------------------------------------------------------------

// Змінні для шляхів до директорій та файлыв проекту------------------------
// File where the favicon markups are stored
let FAVICON_DATA_FILE = 'faviconData.json';

let projectFolder = require('path').basename(__dirname);
let sourceFolder = 'app';
let path = {
  build: {
    html: `${projectFolder}/`,
    css: `${projectFolder}/css/`,
    js: `${projectFolder}/js/`,
    img: `${projectFolder}/img/`,
    fonts: `${projectFolder}/fonts/`
  },
  app: {
    html: `${sourceFolder}/pug/*.pug`,
    css: `${sourceFolder}/scss/style.sass`,
    cssVendor: `${sourceFolder}/scss/style-vendors.sass`,
    js: `${sourceFolder}/js/app.js`,
    jsVendors: `${sourceFolder}/js/vendors.js`,
    img: `${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${sourceFolder}/fonts/**/*.ttf`
  },
  watch: {
    html: `${sourceFolder}/pug/**/*.pug`,
    css: `${sourceFolder}/scss/**/*.sass`,
    cssVendor: `${sourceFolder}/scss/style-vendors.sass`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    favicon: `${sourceFolder}/img/favicon.png}`
  },
  clean: `./${projectFolder}/`
};

//--------------------------------------------------------------------------

// Налаштування browserSync
function browserSync() {
  browsersync.init({
    server: {
      baseDir: `./${projectFolder}/`
    },
    port: 3000,
    notify: false
  })
}
//--------------------------------------------------------------------------

//Компілюємо файли PUG в HTML-----------------------------------------------
function htmlCompiler() {
  return src(path.app.html)
      .pipe(changed(projectFolder))
      .pipe(plumberNotifier())
      .pipe(pug())
      .pipe(webpHTML())
      .pipe(dest(path.build.html))
      .pipe(prettyHtml({
        indent_size: 2
      }))
      .pipe(rename({extname: '.pretty.html'}))
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
}
//--------------------------------------------------------------------------
// Переганяэмо файли стилів бібліотек та мініфікуємо-----------------------------------
function cssVendorCompiler() {
  return src(path.app.cssVendor)
    .pipe(changed(projectFolder))
    .pipe(plumberNotifier())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded', importer: tildeImporter, includePaths: require("scss-resets").includePaths}))
    .pipe(groupmedia())
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(path.build.css))
    .pipe(cleanCSS({level:2}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}
// Переганяэмо файли стилів і мініфікуємо-----------------------------------
function cssCompiler() {
  return src(path.app.css)
      .pipe(changed(projectFolder))
      .pipe(plumberNotifier())
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded', importer: tildeImporter, includePaths: require("scss-resets").includePaths}))
      .pipe(groupmedia())
      .pipe(autoprefixer({
        cascade: true
      }))
      .pipe(webpcss({
        webpClass: '.webp',
        noWebpClass: 'no-webp'
      }))
      .pipe(sourcemaps.write('/'))
      .pipe(dest(path.build.css))
      .pipe(cleanCSS({level:2}))
      .pipe(rename({extname: '.min.css'}))
      .pipe(sourcemaps.write('/'))
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
}
//--------------------------------------------------------------------------

// Переганяэмо JS-vendors файли і мініфікуємо-------------------------------
function jsVendorsCompiler() {
  return src(path.app.jsVendors)
    .pipe(changed(projectFolder))
    .pipe(plumberNotifier())
    .pipe(include())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}
//--------------------------------------------------------------------------

// Переганяэмо JS файли і мініфікуємо---------------------------------------
function jsCompiler() {
  return src(path.app.js)
      .pipe(changed(projectFolder))
      .pipe(plumberNotifier())
      .pipe(include())
      .pipe(babel())
      .pipe(dest(path.build.js))
      .pipe(uglify({
        toplevel: true
      }))
      .pipe(rename({extname: '.min.js'}))
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
}
//--------------------------------------------------------------------------

// Обробка картинок---------------------------------------------------------
function imgCompiler() {
  return src(path.app.img)
      .pipe(changed(projectFolder))
      .pipe(plumberNotifier())
      .pipe(webp({quality: 85}))
      .pipe(dest(path.build.img))
      .pipe(src(path.app.img))
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: true}],
        interlaced: true,
        optimizationlevel: 3  //0 to 7
      }))
      .pipe(dest(path.build.img))
      .pipe(browsersync.stream())
}
//--------------------------------------------------------------------------

// Обробка FAVICON----------------------------------------------------------
function generateFavicon(done) {
  realFavicon.generateFavicon({
    masterPicture: `${sourceFolder}/img/favicon.png`,
    dest: `${projectFolder}/img/favicons`,
    iconsPath: `/img/favicons/`,
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
}
// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
function injectFaviconMarkups (){
  return src([`${projectFolder}/*.html`])
      // .pipe(plumberNotifier())
      .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(dest(path.build.html))
}
// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
function checkForFaviconUpdate (done){
  let currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
}
//--------------------------------------------------------------------------

// SVG SPRITES--Запустити окремо, якщо потрібно-----------------------------
function svgSprite() {
  return src(`${sourceFolder}/iconsprite/*.svg`)
      .pipe(changed(projectFolder))
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(plumberNotifier())
      .pipe(svgsprite({
        mode: {
          symbol: {
            dest: 'icons/',
            sprite: 'icons.svg',
            render: {
              scss: true // Activate Sass output (with default options)
            },
            example: true
          }
        },
      }))
      .pipe(dest(path.build.img))
}
//--------------------------------------------------------------------------

// FONT CONVERTER OTF --Запустити окремо, якщо потрібно---------------------
function otf2ttf() {
  return src(`${sourceFolder}/fonts/*.otf`)
      .pipe(changed(projectFolder))
      .pipe(plumberNotifier())
      .pipe(fonter({
        formats: ['ttf']
      }))
      .pipe(dest(`${sourceFolder}/fonts/`));
}
//--------------------------------------------------------------------------

// FONT CONVERTER ----------------------------------------------------------
function fonts() {
   src(path.app.fonts)
      .pipe(changed(projectFolder))
      .pipe(plumberNotifier())
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts));
   return src(path.app.fonts)
       .pipe(ttf2woff2())
       .pipe(dest(path.build.fonts));
}
//--------------------------------------------------------------------------

// Очищення папки DIST------------------------------------------------------
function clean() {
  return del([path.clean]);
}
//--------------------------------------------------------------------------

//JS-ФУНКЦИЯ ЗАПИСИ ИНФОРМАЦИИ В _FONTS.SASS---------------------------------
function fontsStyle(done) {
  let file_content = fs.readFileSync(sourceFolder + '/scss/particles/_fonts.sass');
  if (file_content == '') {
    fs.writeFile(sourceFolder + '/scss/particles/_fonts.sass', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(sourceFolder + '/scss/particles/_fonts.sass', '@include font("' + fontname + '", "' + fontname + '", "400", "normal")\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
  done();
}
function cb() {
}
//--------------------------------------------------------------------------

// Відслідковування змін файлів в папці APP (WATCH)-------------------------
function watcher() {
  watch(path.watch.html, htmlCompiler);
  watch(path.watch.css, cssCompiler);
  watch(path.watch.cssVendor, cssVendorCompiler);
  watch(path.watch.js, parallel(jsVendorsCompiler, jsCompiler));
  watch(path.watch.img, imgCompiler);
}
//--------------------------------------------------------------------------

let build = series(clean, parallel(htmlCompiler,cssCompiler,cssVendorCompiler,jsVendorsCompiler,jsCompiler,imgCompiler,fonts),fontsStyle,svgSprite);
let dev = parallel(build, watcher, browserSync);
let favicon = series(generateFavicon,injectFaviconMarkups);

// Експортуємо функції в GULP (дружимо їх)
exports.clean = clean;
exports.htmlCompiler = htmlCompiler;
exports.cssCompiler = cssCompiler;
exports.cssVendorCompiler = cssVendorCompiler;
exports.jsCompiler = jsCompiler;
exports.jsVendorsCompiler = jsVendorsCompiler;
exports.imgCompiler = imgCompiler;
exports.svgSprite = svgSprite;
exports.fonts = fonts;
exports.otf2ttf = otf2ttf;
exports.fontsStyle = fontsStyle;
exports.generateFavicon = generateFavicon;
exports.injectFaviconMarkups = injectFaviconMarkups;
exports.checkForFaviconUpdate = checkForFaviconUpdate;
exports.browserSync = browserSync;
exports.dev = dev;
exports.build = build;
exports.favicon = favicon;
