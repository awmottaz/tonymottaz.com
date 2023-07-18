module.exports = function (collection) {
  if (!collection?.length) {
    return new Date();
  }

  return new Date(
    Math.max(
      ...collection.map((item) => {
        return item.date;
      }),
    ),
  );
};
