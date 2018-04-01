#!/usr/bin/env node
const util = require('util');
const fs = require('fs');
const cheerio = require('cheerio');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

(async function() {

  const argv = process.argv.slice(2);
  if (argv.length <= 0) {
    console.log('Usage: cmd-markdown-clean <path/to/file>');
    return -1;
  }

  const path = argv[0];
  console.log('opening', path);
  var content = await readFile(path);
  const $ = cheerio.load(content);
  $('#editor-reader-full').siblings().remove();
  $('#wmd-preview').siblings().remove();
  content = $.html();
  console.log('saving', path);
  await writeFile(path, content);
  console.log('done');

})();
