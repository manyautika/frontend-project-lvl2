import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);

const makeFullPath = (fileName) => path.resolve(currentDirname, '..', '__fixtures__', fileName);
const diff = fs.readFileSync(makeFullPath('diff'), 'utf-8');
test('JSON diff', () => {
  const path1 = makeFullPath('file1.json');
  const path2 = makeFullPath('file2.json');
  expect(genDiff(path1, path2)).toBe(diff);
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
