import _ from 'lodash';

const buildIndent = (nest) => '  '.repeat(nest);

const stringify = (data, nest) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const currentNest = nest + 2;
  const keys = Object.keys(data);
  const result = keys.flatMap((key) => {
    const value = data[key];
    const newData = _.isPlainObject(value)
      ? `\n${buildIndent(currentNest + 1)}${key}: ${stringify(value, currentNest)}`
      : `\n${buildIndent(currentNest + 1)}${key}: ${value}`;
    return newData;
  });
  return `{${result.join('')}\n${buildIndent(currentNest - 1)}}`;
};
const prepareNodeForRender = {
  nested: (node, nest, stylish) => {
    const currentNest = nest + 2;
    return `${buildIndent(nest)}  ${node.key}: {\n${stylish(node.children, currentNest)}\n${buildIndent(currentNest - 1)}}`;
  },
  unchanged: (node, nest) => `${buildIndent(nest)}  ${node.key}: ${stringify(node.value, nest)}`,
  added: (node, nest) => `${buildIndent(nest)}+ ${node.key}: ${stringify(node.value, nest)}`,
  removed: (node, nest) => `${buildIndent(nest)}- ${node.key}: ${stringify(node.value, nest)}`,
  updated: (node, nest) => `${buildIndent(nest)}- ${node.key}: ${stringify(node.valueBefore, nest)}\n${buildIndent(nest)}+ ${node.key}: ${stringify(node.valueAfter, nest)}`,
};
const stylish = (tree, nest = 1) => tree.flatMap((node) => {
  const handler = prepareNodeForRender[node.type];
  return handler(node, nest, stylish);
}).join('\n');

export default (tree) => `{\n${stylish(tree)}\n}`;
