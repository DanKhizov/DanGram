module.exports = {
  dev: {
    port: process.env.PORT || 5000,
    dbURI: process.env.DB_URI || "mongodb://localhost:27017/metaSharer",
    dbParams: { useNewUrlParser: true }
  },
  prod: {
    // TODO
  }
};
