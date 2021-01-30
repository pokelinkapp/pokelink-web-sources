import hex2rgba from "./hex2rgba";

const normalizeColor = (str, opacity = 100, clientSettings) => {
  // hex color
  if (str.indexOf("#") !== -1) {
    return hex2rgba(str, opacity);
  }

  // if html color
  if (typeof clientSettings.htmlColors[str] !== "undefined") {
    return clientSettings.htmlColors[str];
  }

  // rgb/rgba values!
  if (str.indexOf("rgb(") !== -1 || str.indexOf("rgba(") !== -1) {
    if (str.indexOf("rgb(") !== -1) {
      str = str.replace("rgb(", "rgba(");
      str = str.replace(")", ", " + opacity / 100 + ")");
    } else {
      str = str.replace(/[\d.]+\)$/g, "" + opacity / 100 + ")");
    }
  }

  // we dunno what this is, just return
  return str;
};

export default normalizeColor;
