module.exports = {
  dev: {
    port: process.env.PORT || 5000,
    dbURI: process.env.DB_URI || "mongodb://mongo:27017/danGram",
    dbParams: { useNewUrlParser: true }
  },
  prod: {
    // TODO
  }
};
