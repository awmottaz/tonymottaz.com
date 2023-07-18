module.exports = function (date) {
  const isoDate = date.toISOString();
  const [isoDateWithoutMS] = isoDate.split(".");
  return `${isoDateWithoutMS}Z`;
};
