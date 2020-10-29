import _ from 'lodash';

const isObject = (item) => typeof item === 'object';

const nodeWriter = (key, first, second, buildAST) => {
  //  unchanged
  if (JSON.stringify(first[key]) === JSON.stringify(second[key])) {
    return {
      key,
      state: 'unchanged',
      value: first[key],
    };
  }
  //  nested (recursion)
  if (isObject(first[key]) && isObject(second[key])) {
    return {
      key,
      state: 'nested',
      children: buildAST(first[key], second[key]),
    };
  }
  //  added/removed
  if (!_.has(first, key) || !_.has(second, key)) {
    const added = {
      key,
      state: 'added',
      value: second[key],
    };
    const removed = {
      key,
      state: 'removed',
      value: first[key],
    };
    return _.has(first, key) ? removed : added;
  }
  //  updated
  const updated = {
    key,
    state: 'updated',
    valueBefore: first[key],
    valueAfter: second[key],
  };
  return updated;
};

const buildAST = (data1, data2) => {
  const firstKeys = Object.keys(data1);
  const secondKeys = Object.keys(data2);
  const bothFilesKeys = _.union(firstKeys, secondKeys).sort();
  const result = bothFilesKeys.reduce((acc, key) => {
    const currentNode = nodeWriter(key, data1, data2, buildAST);
    return [...acc, currentNode];
  }, []);
  return result;
};
export default buildAST;
