import yaml from 'js-yaml';
import ini from 'ini';

export default (content, format) => {
  const parseFunctions = {
    '.yaml': yaml.safeLoad,
    '.yml': yaml.safeLoad,
    '.json': JSON.parse,
    '.ini': ini.parse,
  };
  return parseFunctions[format](content);
};
