import path from 'path';
import fs from 'fs';
import buildTree from './src/buildTree.js';
import parse from './src/parsers.js';
import render from './src/formatters/index.js';

const getPath = (filePath) => (path.resolve(process.cwd, filePath));
const readFile = (filePath) => (fs.readFileSync(filePath, 'utf-8'));
const getExtname = (filePath) => path.extname(filePath);

export default (path1, path2, formatterName = 'stylish') => {
  const pathToFile1 = getPath(path1);
  const pathToFile2 = getPath(path2);
  const reading1 = readFile(pathToFile1);
  const reading2 = readFile(pathToFile2);
  const extname1 = getExtname(pathToFile1);
  const extname2 = getExtname(pathToFile2);
  const data1 = parse(reading1, extname1);
  const data2 = parse(reading2, extname2);
  const internalTree = buildTree(data1, data2);
  return render(formatterName, internalTree);
};
