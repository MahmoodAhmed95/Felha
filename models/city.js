const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const citySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("City", citySchema);
