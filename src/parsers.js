import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yaml from 'js-yaml';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);

export default (pathToFile) => {
  const fullPath = path.resolve(currentDirname, pathToFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const format = path.extname(fullPath);
  return format === '.json' ? JSON.parse(content) : yaml.safeLoad(content);
};
