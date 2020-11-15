import _ from 'lodash';

const buildIndent = (depth) => ' '.repeat(4 * depth - 2);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const currentDepth = depth + 1;
  const keys = Object.keys(data);
  const result = keys.flatMap((key) => {
    const value = data[key];
    return `${buildIndent(currentDepth)}  ${key}: ${stringify(value, currentDepth)}`;
  });
  return `{\n${result.join('\n')}\n${buildIndent(depth)}  }`;
};
const mapping = {
  nested: (node, depth, generate) => {
    const currentDepth = depth + 1;
    return `${buildIndent(depth)}  ${node.key}: {\n${generate(node.children, currentDepth)}\n${buildIndent(depth)}  }`;
  },
  unchanged: (node, depth) => `${buildIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`,
  added: (node, depth) => `${buildIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) => `${buildIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
  updated: (node, depth) => [`${buildIndent(depth)}- ${node.key}: ${stringify(node.old, depth)}`, `${buildIndent(depth)}+ ${node.key}: ${stringify(node.new, depth)}`],
};
const generate = (tree, depth = 1) => tree.flatMap((node) => mapping[node.type](node, depth, generate)).join('\n');

export default (tree) => `{\n${generate(tree)}\n}`;
