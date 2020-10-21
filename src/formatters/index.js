import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (formater) => {
  const formatters = {
    stylish,
    plain,
    json,
  };
  return formatters[formater];
};
