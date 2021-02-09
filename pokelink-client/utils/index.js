const { getStatusColor } = require("./getStatusColor");
const { getTypecolor } = require("./getTypeColor");
const { hex2rgba } = require("./hex2rgba");
const { normalizeColor } = require("./normalizeColor");
const { string2Hex } = require("./string2Hex");
const { transformPokemon } = require("./transformPokemon");
const { trimSprite } = require("./trim");
const { unCamelCase } = require("./unCamelCase");
const { getParam } = require("./getParam");

module.exports = {
  getStatusColor,
  getTypecolor,
  hex2rgba,
  normalizeColor,
  string2Hex,
  transformPokemon,
  trimSprite,
  unCamelCase,
  getParam,
};
