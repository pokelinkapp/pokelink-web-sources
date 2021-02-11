const getParam = (param) => {
  if (typeof window !== "undefined") {
    return new URLSearchParams(document.location.search.substring(1)).get(
      param
    );
  }

  return "";
};

module.exports = { getParam };
