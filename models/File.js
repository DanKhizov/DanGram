const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  doc_id: {
    type: String
  },
  length: {
    type: Number
  },
  name: {
    type: String
  },
  type: {
    type: String
  }
});

module.exports = model("files", fileSchema);
