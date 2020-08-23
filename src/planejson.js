import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export default (file1, file2) => {
  const one = JSON.parse(fs.readFileSync(path.resolve(file1), 'utf-8'));
  const two = JSON.parse(fs.readFileSync(path.resolve(file2), 'utf-8'));
  const oneKeys = Object.keys(one);
  const twoKeys = Object.keys(two);
  const arr = _.union(oneKeys, twoKeys).sort();
  const result = arr.map((key) => {
    if(one[key] === two[key]) {
      return `  ${key}: ${one[key]}`;
    }
    if(!one.hasOwnProperty(key)) {
        return `+ ${key}: ${two[key]}`;
    }
    if(!two.hasOwnProperty(key)) {
      return `- ${key}: ${one[key]}`;
    }
    else {
        return `- ${key}: ${one[key]}\n+ ${key}: ${two[key]}`;
    }
  });
  const str = `{\n${result.join('\n')}\n}`;
  console.log(str);
  return str;
};
