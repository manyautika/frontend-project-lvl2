import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);

const getPath = (fileName) => path.resolve(currentDirname, '..', '__fixtures__', fileName);
const readFixture = (formatter) => {
  const pathToFixture = getPath(`${formatter}-format`);
  return fs.readFileSync(pathToFixture, 'utf-8');
};
const fileType = ['json', 'yaml', 'ini'];
const stylish = readFixture('stylish');
const plain = readFixture('plain');
const json = readFixture('json');

test.each(fileType)('format: %s', (extension) => {
  const file1 = getPath(`file1.${extension}`);
  const file2 = getPath(`file2.${extension}`);
  expect(genDiff(file1, file2, 'stylish')).toBe(stylish);
  expect(genDiff(file1, file2, 'plain')).toBe(plain);
  expect(genDiff(file1, file2, 'json')).toBe(json);
});
