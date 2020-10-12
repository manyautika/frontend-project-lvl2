#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .description(' Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => genDiff(filePath1, filePath2))
  .option('-s, --stylish <type>', 'Specify type of formater', 'stylish');

program.parse(process.argv);
