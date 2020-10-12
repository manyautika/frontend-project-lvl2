import _ from 'lodash';

const isObject = (item) => typeof item === 'object';

const nodeWriter = (key, first, second, f) => {
  //  unchanged
  if (JSON.stringify(first[key]) === JSON.stringify(second[key])) {
    return {
      key,
      state: 'unchanged',
      value: first[key],
    };
  }
  //  recursion
  if (isObject(first[key]) && isObject(second[key])) {
    return {
      key,
      state: 'nested',
      children: f(first[key], second[key]),
    };
  }
  //  added/deleted
  if (!_.has(first, key) || !_.has(second, key)) {
    const added = {
      key,
      state: 'added',
      value: second[key],
    };
    const deleted = {
      key,
      state: 'deleted',
      value: first[key],
    };
    return _.has(first, key) ? deleted : added;
  }
  //  modified
  const modiff = {
    key,
    state: 'modified',
    valueBefore: first[key],
    valueAfter: second[key],
  };
  return modiff;
};

const buildAST = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);
  const bothFilesKeys = _.union(firstKeys, secondKeys).sort();
  return bothFilesKeys.reduce((acc, key) => {
    const currentNode = nodeWriter(key, obj1, obj2, buildAST);
    return [...acc, currentNode];
  }, []);
};
export default buildAST;
