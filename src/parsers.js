import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numerifyValues = (obj) => {
  const result = _.mapValues(obj, (value) => {
    if (_.isObject(value)) {
      return numerifyValues(value);
    }
    const newValue = parseInt(value, 10);
    return isNaN(newValue) ? value : newValue; // eslint-disable-line
  });
  return result;
};

const parseINI = (rawData) => {
  const data = ini.parse(rawData);
  return numerifyValues(data);
};

export default (content, format) => {
  const parseFunctions = {
    yaml: yaml.safeLoad,
    yml: yaml.safeLoad,
    json: JSON.parse,
    ini: parseINI,
  };
  const parse = parseFunctions[format];
  return parse(content);
};
