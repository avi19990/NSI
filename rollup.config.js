import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace'
import del from 'rollup-plugin-delete'
import { terser } from "rollup-plugin-terser"

const args = require('args-parser')(process.argv);
const environment = args.environment || 'development';

const plugins = [];

if (environment === 'production')
{
    plugins.push(del({ targets: 'dist/*' }));
}

plugins.push(typescript({
    lib: ["es5", "es6", "dom"],
    target: "es5"
}));

plugins.push(replace({
    __buildEnv__: environment
}));

if (environment === 'production')
{
    plugins.push(terser());
}

plugins.push(copy({
    targets: [
        { src: 'node_modules/phaser/dist/phaser.min.js', dest: 'dist' },
        { src: 'src/html/index.html', dest: 'dist' },
        { src: 'src/assets', dest: 'dist' }
    ]
}));

plugins.push(serve({
    open: true,
    contentBase: 'dist',
    host: 'localhost',
    port: 3000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}));

if (environment !== 'production')
{
    plugins.push(livereload('dist'));
}

export default {
    input: [
        './src/game.ts'
    ],
    output: {
        file: './dist/game.js',
        name: 'Phaser3Boilerplate',
        format: 'iife',
        sourcemap: environment === 'production' ? false : true
    },
    esternal: [ 'phaser' ],
    plugins: plugins
};