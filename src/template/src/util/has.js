module.exports = (obj, keys) => {
  return (Array.isArray(keys) ? keys : [keys]).every((i) => i in obj);
};
