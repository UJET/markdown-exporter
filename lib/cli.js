#!/usr/bin/env node

if (process.argv.length < 3) {
    console.log("Please specify a markdown file to convert");
    process.exit(1);
}

require('./markdown-themeable-pdf')(process.argv[2]);