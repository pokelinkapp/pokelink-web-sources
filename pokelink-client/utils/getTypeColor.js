const getTypeColor = (type, clientSettings) => {
  if (typeof type !== "string") {
    return "white";
  }
  if (type.len == 0) {
    return "white";
  }

  return clientSettings.typeColors[type.toLowerCase()];
};

module.exports = { getTypeColor };
