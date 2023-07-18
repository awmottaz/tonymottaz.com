const { DateTime } = require("luxon");

module.exports = function (dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
    DateTime.DATE_FULL,
  );
};
