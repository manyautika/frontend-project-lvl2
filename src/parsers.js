import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParse = (rowData) => {
  const data = ini.parse(rowData);

  const generate = (obj) => {
    const result = _.mapValues(obj, (value) => {
      if (_.isObject(value)) {
        return generate(value);
      }
      const newValue = parseInt(value, 10);
      return isNaN(newValue) ? value : newValue; // eslint-disable-line
    });
    return result;
  };

  return generate(data);
};

export default (content, format) => {
  const parseFunctions = {
    yaml: yaml.safeLoad,
    yml: yaml.safeLoad,
    json: JSON.parse,
    ini: iniParse,
  };
  const parse = parseFunctions[format];
  return parse(content);
};
