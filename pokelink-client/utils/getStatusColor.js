const getStatusColor = (status, clienttSettings) => {
  if (typeof status !== "string") {
    return "white";
  }
  if (status.len == 0) {
    return "white";
  }

  return clienttSettings.statusColors[status.toLowerCase()];
};

module.exports = { getStatusColor };
