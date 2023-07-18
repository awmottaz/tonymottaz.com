module.exports = function (rel, base) {
  try {
    return new URL(rel, base).toString();
  } catch (error) {
    console.error(error);
  }
};
