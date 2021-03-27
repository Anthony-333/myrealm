const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const snippetSchemabanks = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    code: { type: String },
    user: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Snippetbanks = mongoose.model("snippetbanks", snippetSchemabanks);

module.exports = Snippetbanks;


