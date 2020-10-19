import stylish from './stylish.js';
import plane from './plane.js';
import json from './json.js';

export default (formater) => {
  const formatters = {
    stylish,
    plane,
    json,
  };
  return formatters[formater];
};
