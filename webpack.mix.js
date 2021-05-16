const mix = require('laravel-mix');

require('@ayctor/laravel-mix-svg-sprite');
require('dotenv').config();

mix.js('./resources/js/main.js', './public/js');
mix.sass('./resources/sass/main.scss', './public/css');

mix.version()
    .sourceMaps(false, 'source-map')
    .browserSync({
        // proxy: `localhost:${process.env.PROJECT_PORT}`,
        port: process.env.BROWSER_SYNC_PORT
    });

/* vue.js */
mix.js('./resources/js/vue/app.js', './public/js/vue/app.js');
