module.exports = file => {
  if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
    return true;
  }

  return true;
};
