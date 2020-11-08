import _ from 'lodash';

const nodeTypesTable = [
  {
    check: (key, obj1, obj2) => _.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]),
    build: (key, obj1, obj2, buildTree) => ({ key, type: 'nested', children: buildTree(obj1[key], obj2[key]) }),
  },
  {
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    build: (key, obj1, obj2) => ({ key, type: 'added', value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    build: (key, obj1) => ({ key, type: 'removed', value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    build: (key, obj1) => ({ key, type: 'unchanged', value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    build: (key, obj1, obj2) => ({
      key, type: 'updated', valueBefore: obj1[key], valueAfter: obj2[key],
    }),
  },
];

const buildTree = (data1, data2) => {
  const firstKeys = Object.keys(data1);
  const secondKeys = Object.keys(data2);
  const allKeys = _.sortBy(_.union(firstKeys, secondKeys));
  const result = allKeys.map((key) => {
    const nodeType = nodeTypesTable.find((item) => (item.check(key, data1, data2)));
    const currentNodeHandler = nodeType.build;
    const currentNode = currentNodeHandler(key, data1, data2, buildTree);
    return currentNode;
  });
  return result;
};
export default buildTree;
