import path from 'path';
import fs from 'fs';
import buildTree from './buildTree.js';
import parse from './parsers.js';
import render from './formatters/index.js';

const getPath = (filePath) => (path.resolve(process.cwd, filePath));
const readFile = (filePath) => (fs.readFileSync(filePath, 'utf-8'));
const getFormat = (filePath) => {
  const extname = path.extname(filePath);
  return extname.slice(1);
};

export default (path1, path2, formatterName = 'stylish') => {
  const pathToFile1 = getPath(path1);
  const pathToFile2 = getPath(path2);
  const rowData1 = readFile(pathToFile1);
  const rowData2 = readFile(pathToFile2);
  const formatFile1 = getFormat(pathToFile1);
  const formatFile2 = getFormat(pathToFile2);
  const data1 = parse(rowData1, formatFile1);
  const data2 = parse(rowData2, formatFile2);
  const internalTree = buildTree(data1, data2);
  return render(formatterName, internalTree);
};
