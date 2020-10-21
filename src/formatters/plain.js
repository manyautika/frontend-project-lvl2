const isObject = (item) => typeof item === 'object';
const valueFormater = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};
const stateFunc = (state, keys, data) => {
  const keysLine = keys.join('.');
  const states = {
    added: (node) => (`Property '${keysLine}' was added with value: ${valueFormater(node.value)}`),
    removed: () => (`Property '${keysLine}' was removed`),
    updated: (node) => (`Property '${keysLine}' was updated. From ${valueFormater(node.valueBefore)} to ${valueFormater(node.valueAfter)}`),
    unchanged: () => (null),
  };
  return states[state](data);
};
export default (ast) => {
  const plain = (arr, keys = []) => {
    const result = arr.reduce((acc, node) => {
      const keyLine = [...keys, node.key];
      if (node.state === 'nested') {
        return [...acc, ...plain(node.children, keyLine)];
      }
      return [...acc, stateFunc(node.state, keyLine, node)];
    }, []);
    return result;
  };
  return plain(ast).filter(Boolean).join('\n');
};
