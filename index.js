#! /usr/bin/env node

const simp2trad = require('./lib/simp2trad')
const fs = require('fs')

if (process.argv.length !== 3){
    console.log('Usage: simp2trad <target root path>');
    process.exit();
}

var path = process.argv[2];
if (!fs.existsSync(path)){
    console.log('Path Not Exists.');
    process.exit();
}

var tool = new simp2trad(path);
tool.start();