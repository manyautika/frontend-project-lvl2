import buildAST from './buildAST.js';
import parse from './parsers.js';
import formatters from './formatters/index.js';

export default (file1, file2, formater = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const ast = buildAST(obj1, obj2);
  const diff = formatters(formater)(ast);
  console.log(diff);
  return diff;
};
