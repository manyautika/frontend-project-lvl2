import _ from 'lodash';

const valueFormater = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};
const prepareNodeForRender = (state, keys, data, func) => {
  const keysLine = keys.join('.');
  const states = {
    nested: (node) => func(node.children, keys),
    added: (node) => (`Property '${keysLine}' was added with value: ${valueFormater(node.value)}`),
    removed: () => (`Property '${keysLine}' was removed`),
    updated: (node) => (`Property '${keysLine}' was updated. From ${valueFormater(node.valueBefore)} to ${valueFormater(node.valueAfter)}`),
    unchanged: () => (null),
  };
  const stateFunc = states[state];
  return stateFunc(data);
};
export default (tree) => {
  const plain = (arr, keys = []) => {
    const result = arr.flatMap((node) => {
      const keyLine = [...keys, node.key];
      return prepareNodeForRender(node.state, keyLine, node, plain);
    }, []);
    return result;
  };
  return plain(tree).filter((item) => item !== null).join('\n');
};
