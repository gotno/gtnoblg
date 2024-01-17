const { DateTime } = require("luxon");

module.exports = {
  layout: "templates/_post_alone.liquid",
  tags: "vcvrvr_post",
  header_class: "vcvrvr",
  header_markup: "<span>vcvrvr</span>(vrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvrvr)",
  eleventyComputed: {
    dateString: ({ page }) => DateTime.fromJSDate(page.date, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL),
  },
}
