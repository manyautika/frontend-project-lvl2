import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);

const parse = (pathToFile) => {
  const fullPath = path.resolve(currentDirname, pathToFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const format = path.extname(fullPath);
  return format === '.json' ? JSON.parse(content) : yaml.safeLoad(content);
  // if (format === '.yaml') {
  //   return yaml.safeLoad(content);
  // }
  // //  if (format === '.json') {
  // return JSON.parse(content);
  // //  }
};
export default (file1, file2) => {
  const firstFile = parse(file1);
  const secondFile = parse(file2);
  const firstKeys = Object.keys(firstFile);
  const secondKeys = Object.keys(secondFile);
  const bothFilesKeys = _.union(firstKeys, secondKeys).sort();
  const result = bothFilesKeys.map((key) => {
    if (firstFile[key] === secondFile[key]) {
      return `  ${key}: ${firstFile[key]}`;
    }
    if (!_.has(firstFile, key)) {
      return `+ ${key}: ${secondFile[key]}`;
    }
    if (!_.has(secondFile, key)) {
      return `- ${key}: ${firstFile[key]}`;
    }
    return `- ${key}: ${firstFile[key]}\n+ ${key}: ${secondFile[key]}`;
  });
  const str = `{\n${result.join('\n')}\n}`;
  return str;
};
