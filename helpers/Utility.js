"use strict";
let slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-\.]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim -  = require ( start of text
    .replace(/-+$/, ""); // Trim -  = require ( end of text
};

module.exports = { slugify };
