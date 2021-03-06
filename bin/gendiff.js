#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2, cmdObj) => {
    const diff = genDiff(filePath1, filePath2, cmdObj.format);
    console.log(diff);
  })
  .parse(process.argv);
