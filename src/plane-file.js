import _ from 'lodash';
import parse from './parsers.js';

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
    return `- ${key}: ${firstFile[key]}\n  + ${key}: ${secondFile[key]}`;
  });
  const str = `{\n  ${result.join('\n  ')}\n}`;
  console.log(str);
  return str;
};
