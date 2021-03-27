const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const snippetSchemawebsite = new mongoose.Schema(
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

const Snippetwebsite = mongoose.model("snippetwebsite", snippetSchemawebsite);

module.exports = Snippetwebsite;


