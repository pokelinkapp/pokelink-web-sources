const collect = require("collect.js");
const gen3 = require("./gen3/items");
const gen4 = require("./gen4/items");
const gen5 = require("./gen5/items");
const gen6 = require("./gen6/items");
const gen7 = require("./gen7/items");

module.exports = collect({
  gen3,
  gen4,
  gen5,
  gen6,
  gen7,
});
