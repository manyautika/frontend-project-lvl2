const isObject = (item) => typeof item === 'object';
const buildSpace = (n) => '  '.repeat(n);

const valueFormater = (data, space) => {
  if (!isObject(data)) {
    return data;
  }
  const currentSpace = space + 2;
  const keys = Object.keys(data);
  const result = keys.flatMap((key) => {
    const value = data[key];
    const newData = isObject(value)
      ? ['\n  ', buildSpace(currentSpace), key, ': ', valueFormater(value, currentSpace)]
      : ['\n  ', buildSpace(currentSpace), key, ': ', value];
    return newData;
  });
  return `{${result.join('')}\n${buildSpace(currentSpace - 1)}}`;
};
const stateFunc = {
  nested: (node, space, stylish) => {
    const currentSpace = space + 2;
    return [buildSpace(space), '  ', node.key, ': {\n', stylish(node.children, currentSpace), buildSpace(currentSpace - 1), '}\n'];
  },
  unchanged: (node, space) => [buildSpace(space), '  ', node.key, ': ', valueFormater(node.value, space), '\n'],
  added: (node, space) => [buildSpace(space), '+ ', node.key, ': ', valueFormater(node.value, space), '\n'],
  removed: (node, space) => [buildSpace(space), '- ', node.key, ': ', valueFormater(node.value, space), '\n'],
  updated: (node, space) => [buildSpace(space), '- ', node.key, ': ', valueFormater(node.valueBefore, space), '\n', buildSpace(space), '+ ', node.key, ': ', valueFormater(node.valueAfter, space), '\n'],
};
const stylish = (ast, space = 1) => ast.flatMap((node) => stateFunc[node.state](node, space, stylish)).join('');
export default (ast) => `{\n${stylish(ast)}}`;
