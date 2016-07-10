'use strict';

require('harmonize')();
var gulp = require('gulp'),
    gutil = require("gulp-util"),
    rigger = require('gulp-rigger'),
    replace = require('gulp-replace'),
    WebpackDevServer = require("webpack-dev-server"),
    webpack = require('webpack'),
    webpackConfigFunc = require("./webpack.config.js"),
    expressHelper = require("./start-express.js");

gulp.task("webpack:build", function (callback) {
    var myConfig = Object.create(webpackConfigFunc(prodProps));
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin()
        //new webpack.optimize.UglifyJsPlugin()
    );
    webpack(myConfig, function (err, stats) {
        processHtml(err, stats, "webpack:build");
        callback();
    });
});

gulp.task("webpack:build-dev", function (callback) {
    var webpackConfig = Object.create(webpackConfigFunc(devProps));
    var args = obtainArguments();
    webpackConfig.devtool = "source-map";
    webpackConfig.debug = true;
    webpackConfig.plugins = webpackConfig.plugins.concat(
        new webpack.DefinePlugin(
            {
                API_URL_CFG: JSON.stringify(args.host + "/" + args.name),
                TIMEOUT_CFG: args.timeout,
            }
        )
    );
    var devCompiler = webpack(webpackConfig);
    devCompiler.run(function (err, stats) {
        processHtml(err, stats, "webpack:build-dev");
        callback();
    });
});

function obtainArguments() {
    var args = {};
    var p = process.argv.slice(2);
    p.map(function (item) {
        if (item === "--timeout=") args.timeout = item.substr(10);
        if (item.indexOf("--host=") > -1) args.host = item.substr(7);
        if(item.indexOf("--app=") > -1) args.name = item.substr(6);
    });

    if (!args.timeout) args.timeout = 10000;
    if (!args.host) args.host = "http://localhost:8080";
    if(!args.name) args.name = "shapeapp";
    return args;
}

function processHtml(err, stats, processName) {
    if (err) throw new gutil.PluginError(processName, err);
    gutil.log("[" + processName + "]", stats.toString({
        colors: true
    }));
    gutil.log("[warn = " + err + "]");
    if (err && err != null) throw new gutil.PluginError(processName, err);
    var json = stats.toJson();
    if (json.errors.length > 0)
        throw new gutil.PluginError(processName, json.errors);
    if (json.warnings.length > 0)
        throw new gutil.PluginError(processName, json.warnings);
    gulp.src(app.src.path + '/pages/index.html')
        .pipe(rigger())
        .pipe(replace(/css\/style\.css/g, 'style.css'))
        .pipe(replace(/js\/app\.js/g, 'app.js'))
        .pipe(gulp.dest(app.dist.html));
}

var chunkName = function (json, name, ext) {
    var chunk = json.assetsByChunkName[name];
    if (Array.isArray(chunk)) {
        chunk = chunk.filter(function (filename) {
            return app.extname(filename).toLowerCase() === ext
        }).shift();
    }
    return chunk;
};

gulp.task("startExpress", function () {
    expressHelper();
});

gulp.task("webpack-dev-server", function (callback) {
    var myConfig = Object.create(webpackConfigFunc(devProps));
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/target/classes/WEB-INF",
        stats: {
            colors: true
        }
    }).listen(9001, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:9001/webpack-dev-server/target/classes/WEB-INF");
    });
});


gulp.task('webpack', ['webpack:build-dev', 'webpack-dev-server']);

gulp.task('default', ["webpack", "startExpress"]);


var devProps = {
    cache: true,
    context_path: "./src/main/webapp/app",
    target_dir: "target/classes/WEB-INF/",
    bundle_filename: "app.js",
    chunk_filename: "[chunkname].js",
    extract_text_name: "style.css"

};

var prodProps = {
    cache: false,
    context_path: "./src/main/webapp/app",
    target_dir: "target/classes/WEB-INF",
    bundle_filename: "[hash].js",
    chunk_filename: "[chunkhash].js",
    extract_text_name: "[contenthash].css"

};

var app = {
    dist: {
        html: 'target/classes/WEB-INF',
        js: 'target/classes/WEB-INF/js/',
        css: 'target/classes/WEB-INF/css/',
        img: 'target/classes/WEB-INF/img/',
        fonts: 'target/classes/WEB-INF/fonts/'
    },
    src: {
        path: 'src/main/webapp/app',
        html: 'src/main/webapp/app/pages/*.html',
        js: 'src/main/webapp/app/js/main.js',
        style: 'src/main/webapp/app/styles/main.scss',
        img: 'src/main/webapp/app/img/**/*.*',
        fonts: 'src/main/webapp/app/fonts/**/*.*'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/**/*.js',
        style: 'app/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './target',

    extname: function (filename) {
        return "." + filename.split('.')[1];
    }
};
