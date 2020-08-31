import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const diff = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('plane JSON diff', () => {
  const path1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
  const path2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');
  expect(gendiff(path1, path2)).toBe(diff);
});
