#!/usr/bin/env node
const Browser = require('./bigbrother').Browser;
const PageBuilder = require('./bigbrother').PageBuilder;

const browser = new Browser({ headless: false });
const builder = new PageBuilder(browser);
browser
    .launch()
    .then(async () => {
       const page = builder
            .withUrl('http://google.com')
            .build();
    })
    .catch(console.log);

