import path from 'path';
import fs from 'fs';
import buildAST from './buildAST.js';
import parse from './parsers.js';
import formatters from './formatters/index.js';

export default (file1, file2, formater = 'stylish') => {
  const pathToFile1 = path.resolve(process.cwd, file1);
  const pathToFile2 = path.resolve(process.cwd, file2);
  const data1 = parse(fs.readFileSync(pathToFile1, 'utf-8'), path.extname(pathToFile1));
  const data2 = parse(fs.readFileSync(pathToFile2, 'utf-8'), path.extname(pathToFile2));
  const ast = buildAST(data1, data2);
  const diff = formatters(formater)(ast);
  return diff;
};
