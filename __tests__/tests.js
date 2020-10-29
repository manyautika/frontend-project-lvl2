import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);

const makeFullPath = (fileName) => path.resolve(currentDirname, '..', '__fixtures__', fileName);
const pairs = [['json', 'plain'], ['json', 'stylish'], ['json', 'json'],
  ['yaml', 'stylish'], ['yaml', 'plain'], ['yaml', 'json'],
  ['ini', 'stylish'], ['ini', 'plain'], ['ini', 'json']];

test.each(pairs)('extension: %s formater: %s', (extension, formater) => {
  const expected = fs.readFileSync(makeFullPath(`${formater}-format`), 'utf-8');
  const file1 = makeFullPath(`file1.${extension}`);
  const file2 = makeFullPath(`file2.${extension}`);
  expect(genDiff(file1, file2, formater)).toBe(expected);
});
