#!/usr/bin/env node

const spawn = require('child_process').spawn;
const chalk = require('chalk');

const urls = [
    'freecodecamp.org',
    'medium.com',
    'stackoverflow.com'
]

let searchUrl = 'https://google.com/search?q=';

function main() 
{
    const [ node, file, ...args] = process.argv;

    if(args.length === 0)
    {
        const error = chalk.red.bold('Missing search parameters.');
        console.log(error);
        process.exit(0);
    }

    buildSearch(args);
    buildSearchSites();
    openBrowser();
}

function buildSearch(args) 
{
    const search = args.join(' ');
    searchUrl = `${searchUrl}${search}`;
}

function buildSearchSites() 
{
    let siteString = '(';

    urls.forEach((i, idx, array) => {
        siteString = idx !== array.length -1 ? ` ${siteString}site:${i} OR ` : `${siteString}site:${i})`
    });

    searchUrl += siteString;
}

function openBrowser() 
{
    spawn('open', [`${searchUrl}`]);
}

main();