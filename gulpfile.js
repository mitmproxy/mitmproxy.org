var gulp = require("gulp");
var path = require('path');
var _ = require('lodash');

var less = require("gulp-less");
var map = require("map-stream");
var minifyCSS = require('gulp-minify-css');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var rev = require("gulp-rev");
var sourcemaps = require('gulp-sourcemaps');

conf = {
    static: "src",
    css: {
        vendor: ["styles/01-vendor.less"],
        app: ["styles/02-app.less"]
    },
};


var manifest = {
    "vendor.css": "01-vendor.css",
    "app.css": "02-app.css",
};

var save_rev = function(){
    return map(function(file, callback){
        if (file.revOrigBase){
            manifest[path.basename(file.revOrigPath)] = path.basename(file.path);
        }
        callback(null, file);
    })
}

var dont_break_on_errors = function(){
    return plumber(
        function(error){
            notify.onError("Error: <%= error.message %>").apply(this, arguments);
            this.emit('end');
        }
    );
};


function styles_dev(files) {
    return (gulp.src(files)
        .pipe(dont_break_on_errors())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write(".", {sourceRoot: "/static"}))
        .pipe(gulp.dest(conf.static)));
}
gulp.task("styles-app-dev", function(){
    styles_dev(conf.css.app);
});
gulp.task("styles-vendor-dev", function(){
    styles_dev(conf.css.vendor);
});


function styles_prod(files) {
    return (gulp.src(files)
        .pipe(less())
        // No sourcemaps support yet :-/
        // https://github.com/jonathanepollack/gulp-minify-css/issues/34
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(save_rev())
        .pipe(gulp.dest(conf.static)));
}
gulp.task("styles-app-prod", function(){
    styles_prod(conf.css.app);
});
gulp.task("styles-vendor-prod", function(){
    styles_prod(conf.css.vendor);
});


gulp.task(
    "dev",
    [
        "styles-vendor-dev",
        "styles-app-dev",
    ]
);
gulp.task(
    "prod",
    [
        "styles-vendor-prod",
        "styles-app-prod",
    ]
);

gulp.task("default", ["dev"], function () {
    gulp.watch(["styles/*vendor*"], ["styles-vendor-dev"]);
    gulp.watch(["styles/*app**"], ["styles-app-dev"]);
});
