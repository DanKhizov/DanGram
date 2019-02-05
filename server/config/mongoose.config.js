const mongoose = require("mongoose");

module.exports = config => {
  const { dbURI, dbParams } = config.dev;

  mongoose.connect(dbURI, dbParams);

  mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
  });

  mongoose.connection.on("error", err => {
    console.log(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(`Mongoose disconnected`);
  });
};
