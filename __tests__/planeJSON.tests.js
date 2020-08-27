import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import path from 'path';

const diff = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('plane JSON diff', () => {
  const path1 = path.resolve('__fixtures__/file1.json');
  const path2 = path.resolve('__fixtures__/file2.json');
  expect(gendiff(path1, path2)).toBe(diff);
});
