const getParam = (param) =>
  new URLSearchParams(document.location.search.substring(1)).get(param);

export default getParam;
