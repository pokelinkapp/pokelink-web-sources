const collect = require("collect.js");
const gen3 = require("./gen3/items").default;
const gen4 = require("./gen4/items").default;
const gen5 = require("./gen5/items").default;
const gen6 = require("./gen6/items").default;
const gen7 = require("./gen7/items").default;

module.exports = collect({
  gen3,
  gen4,
  gen5,
  gen6,
  gen7,
});
