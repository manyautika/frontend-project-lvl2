import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParse = (rowData) => {
  const data = ini.parse(rowData);

  const generate = (obj) => {
    const result = Object.keys(obj)
      .reduce((acc, key) => {
        if (_.isObject(obj[key])) {
          return { ...acc, [key]: { ...generate(obj[key]) } };
        }
        const oldValue = parseInt(obj[key], 10);
        const newValue = isNaN(oldValue) ? obj[key] : oldValue; // eslint-disable-line
        const newAcc = { ...acc, [key]: newValue };
        return newAcc;
      }, {});
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
