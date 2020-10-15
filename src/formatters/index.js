import stylish from './stylish.js';
import plane from './plane.js';

export default (formater) => {
  const formatters = {
    stylish,
    plane,
  };
  return formatters[formater];
};
