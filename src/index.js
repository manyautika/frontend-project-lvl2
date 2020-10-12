import buildAST from './buildAST.js';
import parse from './parsers.js';
import stylish from './stylish.js';

export default (file1, file2) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const ast = buildAST(obj1, obj2);
  console.log(stylish(ast));
  return stylish(ast);
};
