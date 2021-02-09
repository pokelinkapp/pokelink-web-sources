const ColorHash = require("color-hash");

const string2Hex = (str) => {
  var colorHash = new ColorHash({ lightness: 0.5 });
  return colorHash.hex(str);
};

module.exports = { string2Hex };
