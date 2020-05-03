const stringUtils = {
  firstToLowerCase: str => {
    return str[0].toLowerCase() + str.substr(1);
  },

  firstToUpperCase: str => {
    return str[0].toUpperCase() + str.substr(1);
  },
};

export default stringUtils;
