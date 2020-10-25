import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (pathToFile) => {
  const fullPath = path.resolve(pathToFile);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const format = path.extname(fullPath);
  const parseFunctions = {
    '.yaml': yaml.safeLoad,
    '.yml': yaml.safeLoad,
    '.json': JSON.parse,
    '.ini': ini.parse,
  };
  return parseFunctions[format](content);
};
