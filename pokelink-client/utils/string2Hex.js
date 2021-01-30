import ColorHash from "color-hash";

const string2Hex = (str) => {
  var colorHash = new ColorHash({ lightness: 0.5 });
  return colorHash.hex(str);
};

export default string2Hex;
