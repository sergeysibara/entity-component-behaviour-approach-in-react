const otherUtils = {
  isObject: value => {
    return value instanceof Object;
  },

  deepClone: obj => {
    if (!otherUtils.isObject(obj) && !Array.isArray(obj)) {
      return obj;
    }
    return JSON.parse(JSON.stringify(obj));
  }
};

export default otherUtils;
