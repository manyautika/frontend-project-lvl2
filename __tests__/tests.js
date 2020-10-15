import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);

const makeFullPath = (fileName) => path.resolve(currentDirname, '..', '__fixtures__', fileName);
const stylishDiff = fs.readFileSync(makeFullPath('stylish-format'), 'utf-8');
const planeDiff = fs.readFileSync(makeFullPath('plane-format'), 'utf-8');
const file1JSON = makeFullPath('file1.json');
const file2JSON = makeFullPath('file2.json');
// [json, stylish], [json, plain], [yaml, stylish]
test('stylish format', () => {
  expect(genDiff(file1JSON, file2JSON)).toBe(stylishDiff);
});
test('plain format', () => {
  expect(genDiff(file1JSON, file2JSON, 'plane')).toBe(planeDiff);
});
// test('plane YAML diff', () => {
//   const path1 = makeFullPath('file1.yaml');
//   const path2 = makeFullPath('file2.yaml');
//   expect(gendiff(path1, path2)).toBe(diff);
// });
// test('plane ini diff', () => {
//   const path1 = makeFullPath('file1.ini');
//   const path2 = makeFullPath('file2.ini');
//   expect(gendiff(path1, path2)).toBe(diff);
// });
