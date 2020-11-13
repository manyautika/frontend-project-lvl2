import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const prepareNodeForRender = {
  nested: (node, keys, generate) => generate(node.children, keys),
  added: (node, keys) => (`Property '${keys.join('.')}' was added with value: ${stringify(node.value)}`),
  removed: (node, keys) => (`Property '${keys.join('.')}' was removed`),
  updated: (node, keys) => (`Property '${keys.join('.')}' was updated. From ${stringify(node.old)} to ${stringify(node.new)}`),
  unchanged: () => ([]),
};

export default (tree) => {
  const generate = (arr, keys = []) => {
    const result = arr.flatMap((node) => {
      const prorerty = [...keys, node.key];
      const handler = prepareNodeForRender[node.type];
      return handler(node, prorerty, generate);
    }, []);
    return result;
  };
  return generate(tree).join('\n');
};
