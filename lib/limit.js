module.exports = function limit(array, n) {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  return array.slice(0, n);
};
