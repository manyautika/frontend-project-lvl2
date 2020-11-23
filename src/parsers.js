import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numerifyValues = (obj) => {
  const result = _.mapValues(obj, (value) => {
    if (_.isObject(value)) {
      return numerifyValues(value);
    }
    const newValue = parseFloat(value);
    return Number.isNaN(newValue) ? value : newValue;
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
