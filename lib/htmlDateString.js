const { DateTime } = require("luxon");

module.exports = function (dateObj) {
  // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  // https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
};
