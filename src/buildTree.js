import _ from 'lodash';

const checkTable = [
  {
    check: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    build: (key, obj1, obj2, buildTree) => ({ key, state: 'nested', children: buildTree(obj1[key], obj2[key]) }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    build: (key, obj1) => ({ key, state: 'unchanged', value: obj1[key] }),
  },

  {
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    build: (key, obj1, obj2) => ({ key, state: 'added', value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    build: (key, obj1) => ({ key, state: 'removed', value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => (_.has(obj1, key) && _.has(obj2, key)) && obj1[key] !== obj2[key],
    build: (key, obj1, obj2) => ({
      key, state: 'updated', valueBefore: obj1[key], valueAfter: obj2[key],
    }),
  },
];

const buildTree = (data1, data2) => {
  const firstKeys = Object.keys(data1);
  const secondKeys = Object.keys(data2);
  const bothFilesKeys = _.union(firstKeys, secondKeys).sort();
  const result = bothFilesKeys.map((key) => {
    const checking = checkTable.find((item) => (item.check(key, data1, data2)));
    const currentNodeFunction = checking.build;
    const currentNode = currentNodeFunction(key, data1, data2, buildTree);
    return currentNode;
  });
  return result;
};
export default buildTree;
